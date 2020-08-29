--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Debian 10.12-2.pgdg90+1)
-- Dumped by pg_dump version 10.12 (Debian 10.12-2.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: hdb_views; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_views;


ALTER SCHEMA hdb_views OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: check_violation(text); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.check_violation(msg text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  BEGIN
    RAISE check_violation USING message=msg;
  END;
$$;


ALTER FUNCTION hdb_catalog.check_violation(msg text) OWNER TO postgres;

--
-- Name: hdb_schema_update_event_notifier(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.hdb_schema_update_event_notifier() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    instance_id uuid;
    occurred_at timestamptz;
    invalidations json;
    curr_rec record;
  BEGIN
    instance_id = NEW.instance_id;
    occurred_at = NEW.occurred_at;
    invalidations = NEW.invalidations;
    PERFORM pg_notify('hasura_schema_update', json_build_object(
      'instance_id', instance_id,
      'occurred_at', occurred_at,
      'invalidations', invalidations
      )::text);
    RETURN curr_rec;
  END;
$$;


ALTER FUNCTION hdb_catalog.hdb_schema_update_event_notifier() OWNER TO postgres;

--
-- Name: inject_table_defaults(text, text, text, text); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.inject_table_defaults(view_schema text, view_name text, tab_schema text, tab_name text) RETURNS void
    LANGUAGE plpgsql
    AS $$
    DECLARE
        r RECORD;
    BEGIN
      FOR r IN SELECT column_name, column_default FROM information_schema.columns WHERE table_schema = tab_schema AND table_name = tab_name AND column_default IS NOT NULL LOOP
          EXECUTE format('ALTER VIEW %I.%I ALTER COLUMN %I SET DEFAULT %s;', view_schema, view_name, r.column_name, r.column_default);
      END LOOP;
    END;
$$;


ALTER FUNCTION hdb_catalog.inject_table_defaults(view_schema text, view_name text, tab_schema text, tab_name text) OWNER TO postgres;

--
-- Name: insert_event_log(text, text, text, text, json); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.insert_event_log(schema_name text, table_name text, trigger_name text, op text, row_data json) RETURNS text
    LANGUAGE plpgsql
    AS $$
  DECLARE
    id text;
    payload json;
    session_variables json;
    server_version_num int;
  BEGIN
    id := gen_random_uuid();
    server_version_num := current_setting('server_version_num');
    IF server_version_num >= 90600 THEN
      session_variables := current_setting('hasura.user', 't');
    ELSE
      BEGIN
        session_variables := current_setting('hasura.user');
      EXCEPTION WHEN OTHERS THEN
                  session_variables := NULL;
      END;
    END IF;
    payload := json_build_object(
      'op', op,
      'data', row_data,
      'session_variables', session_variables
    );
    INSERT INTO hdb_catalog.event_log
                (id, schema_name, table_name, trigger_name, payload)
    VALUES
    (id, schema_name, table_name, trigger_name, payload);
    RETURN id;
  END;
$$;


ALTER FUNCTION hdb_catalog.insert_event_log(schema_name text, table_name text, trigger_name text, op text, row_data json) OWNER TO postgres;

--
-- Name: check_contributor_request(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_contributor_request() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS(SELECT * FROM project_notifications n WHERE (n.sender_id = NEW.sender_id AND n.notification_type = 'contributor_request' AND n.target_id = NEW.target_id AND is_read = FALSE) )
  THEN
    raise exception 'Request is exists';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_contributor_request() OWNER TO postgres;

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_invocation_logs (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.event_invocation_logs OWNER TO postgres;

--
-- Name: event_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_log (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    schema_name text NOT NULL,
    table_name text NOT NULL,
    trigger_name text NOT NULL,
    payload jsonb NOT NULL,
    delivered boolean DEFAULT false NOT NULL,
    error boolean DEFAULT false NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    locked boolean DEFAULT false NOT NULL,
    next_retry_at timestamp without time zone,
    archived boolean DEFAULT false NOT NULL
);


ALTER TABLE hdb_catalog.event_log OWNER TO postgres;

--
-- Name: event_triggers; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.event_triggers (
    name text NOT NULL,
    type text NOT NULL,
    schema_name text NOT NULL,
    table_name text NOT NULL,
    configuration json,
    comment text
);


ALTER TABLE hdb_catalog.event_triggers OWNER TO postgres;

--
-- Name: hdb_action; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action (
    action_name text NOT NULL,
    action_defn jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false
);


ALTER TABLE hdb_catalog.hdb_action OWNER TO postgres;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO postgres;

--
-- Name: hdb_action_permission; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_permission (
    action_name text NOT NULL,
    role_name text NOT NULL,
    definition jsonb DEFAULT '{}'::jsonb NOT NULL,
    comment text
);


ALTER TABLE hdb_catalog.hdb_action_permission OWNER TO postgres;

--
-- Name: hdb_allowlist; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_allowlist (
    collection_name text
);


ALTER TABLE hdb_catalog.hdb_allowlist OWNER TO postgres;

--
-- Name: hdb_check_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_check_constraint AS
 SELECT (n.nspname)::text AS table_schema,
    (ct.relname)::text AS table_name,
    (r.conname)::text AS constraint_name,
    pg_get_constraintdef(r.oid, true) AS "check"
   FROM ((pg_constraint r
     JOIN pg_class ct ON ((r.conrelid = ct.oid)))
     JOIN pg_namespace n ON ((ct.relnamespace = n.oid)))
  WHERE (r.contype = 'c'::"char");


ALTER TABLE hdb_catalog.hdb_check_constraint OWNER TO postgres;

--
-- Name: hdb_computed_field; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_computed_field (
    table_schema text NOT NULL,
    table_name text NOT NULL,
    computed_field_name text NOT NULL,
    definition jsonb NOT NULL,
    comment text
);


ALTER TABLE hdb_catalog.hdb_computed_field OWNER TO postgres;

--
-- Name: hdb_computed_field_function; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_computed_field_function AS
 SELECT hdb_computed_field.table_schema,
    hdb_computed_field.table_name,
    hdb_computed_field.computed_field_name,
        CASE
            WHEN (((hdb_computed_field.definition -> 'function'::text) ->> 'name'::text) IS NULL) THEN (hdb_computed_field.definition ->> 'function'::text)
            ELSE ((hdb_computed_field.definition -> 'function'::text) ->> 'name'::text)
        END AS function_name,
        CASE
            WHEN (((hdb_computed_field.definition -> 'function'::text) ->> 'schema'::text) IS NULL) THEN 'public'::text
            ELSE ((hdb_computed_field.definition -> 'function'::text) ->> 'schema'::text)
        END AS function_schema
   FROM hdb_catalog.hdb_computed_field;


ALTER TABLE hdb_catalog.hdb_computed_field_function OWNER TO postgres;

--
-- Name: hdb_custom_types; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_custom_types (
    custom_types jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_custom_types OWNER TO postgres;

--
-- Name: hdb_foreign_key_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_foreign_key_constraint AS
 SELECT (q.table_schema)::text AS table_schema,
    (q.table_name)::text AS table_name,
    (q.constraint_name)::text AS constraint_name,
    (min(q.constraint_oid))::integer AS constraint_oid,
    min((q.ref_table_table_schema)::text) AS ref_table_table_schema,
    min((q.ref_table)::text) AS ref_table,
    json_object_agg(ac.attname, afc.attname) AS column_mapping,
    min((q.confupdtype)::text) AS on_update,
    min((q.confdeltype)::text) AS on_delete,
    json_agg(ac.attname) AS columns,
    json_agg(afc.attname) AS ref_columns
   FROM ((( SELECT ctn.nspname AS table_schema,
            ct.relname AS table_name,
            r.conrelid AS table_id,
            r.conname AS constraint_name,
            r.oid AS constraint_oid,
            cftn.nspname AS ref_table_table_schema,
            cft.relname AS ref_table,
            r.confrelid AS ref_table_id,
            r.confupdtype,
            r.confdeltype,
            unnest(r.conkey) AS column_id,
            unnest(r.confkey) AS ref_column_id
           FROM ((((pg_constraint r
             JOIN pg_class ct ON ((r.conrelid = ct.oid)))
             JOIN pg_namespace ctn ON ((ct.relnamespace = ctn.oid)))
             JOIN pg_class cft ON ((r.confrelid = cft.oid)))
             JOIN pg_namespace cftn ON ((cft.relnamespace = cftn.oid)))
          WHERE (r.contype = 'f'::"char")) q
     JOIN pg_attribute ac ON (((q.column_id = ac.attnum) AND (q.table_id = ac.attrelid))))
     JOIN pg_attribute afc ON (((q.ref_column_id = afc.attnum) AND (q.ref_table_id = afc.attrelid))))
  GROUP BY q.table_schema, q.table_name, q.constraint_name;


ALTER TABLE hdb_catalog.hdb_foreign_key_constraint OWNER TO postgres;

--
-- Name: hdb_function; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_function (
    function_schema text NOT NULL,
    function_name text NOT NULL,
    configuration jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_system_defined boolean DEFAULT false
);


ALTER TABLE hdb_catalog.hdb_function OWNER TO postgres;

--
-- Name: hdb_function_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_function_agg AS
 SELECT (p.proname)::text AS function_name,
    (pn.nspname)::text AS function_schema,
    pd.description,
        CASE
            WHEN (p.provariadic = (0)::oid) THEN false
            ELSE true
        END AS has_variadic,
        CASE
            WHEN ((p.provolatile)::text = ('i'::character(1))::text) THEN 'IMMUTABLE'::text
            WHEN ((p.provolatile)::text = ('s'::character(1))::text) THEN 'STABLE'::text
            WHEN ((p.provolatile)::text = ('v'::character(1))::text) THEN 'VOLATILE'::text
            ELSE NULL::text
        END AS function_type,
    pg_get_functiondef(p.oid) AS function_definition,
    (rtn.nspname)::text AS return_type_schema,
    (rt.typname)::text AS return_type_name,
    (rt.typtype)::text AS return_type_type,
    p.proretset AS returns_set,
    ( SELECT COALESCE(json_agg(json_build_object('schema', q.schema, 'name', q.name, 'type', q.type)), '[]'::json) AS "coalesce"
           FROM ( SELECT pt.typname AS name,
                    pns.nspname AS schema,
                    pt.typtype AS type,
                    pat.ordinality
                   FROM ((unnest(COALESCE(p.proallargtypes, (p.proargtypes)::oid[])) WITH ORDINALITY pat(oid, ordinality)
                     LEFT JOIN pg_type pt ON ((pt.oid = pat.oid)))
                     LEFT JOIN pg_namespace pns ON ((pt.typnamespace = pns.oid)))
                  ORDER BY pat.ordinality) q) AS input_arg_types,
    to_json(COALESCE(p.proargnames, ARRAY[]::text[])) AS input_arg_names,
    p.pronargdefaults AS default_args,
    (p.oid)::integer AS function_oid
   FROM ((((pg_proc p
     JOIN pg_namespace pn ON ((pn.oid = p.pronamespace)))
     JOIN pg_type rt ON ((rt.oid = p.prorettype)))
     JOIN pg_namespace rtn ON ((rtn.oid = rt.typnamespace)))
     LEFT JOIN pg_description pd ON ((p.oid = pd.objoid)))
  WHERE (((pn.nspname)::text !~~ 'pg_%'::text) AND ((pn.nspname)::text <> ALL (ARRAY['information_schema'::text, 'hdb_catalog'::text, 'hdb_views'::text])) AND (NOT (EXISTS ( SELECT 1
           FROM pg_aggregate
          WHERE ((pg_aggregate.aggfnoid)::oid = p.oid)))));


ALTER TABLE hdb_catalog.hdb_function_agg OWNER TO postgres;

--
-- Name: hdb_function_info_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_function_info_agg AS
 SELECT hdb_function_agg.function_name,
    hdb_function_agg.function_schema,
    row_to_json(( SELECT e.*::record AS e
           FROM ( SELECT hdb_function_agg.description,
                    hdb_function_agg.has_variadic,
                    hdb_function_agg.function_type,
                    hdb_function_agg.return_type_schema,
                    hdb_function_agg.return_type_name,
                    hdb_function_agg.return_type_type,
                    hdb_function_agg.returns_set,
                    hdb_function_agg.input_arg_types,
                    hdb_function_agg.input_arg_names,
                    hdb_function_agg.default_args,
                    (EXISTS ( SELECT 1
                           FROM information_schema.tables
                          WHERE (((tables.table_schema)::text = hdb_function_agg.return_type_schema) AND ((tables.table_name)::text = hdb_function_agg.return_type_name)))) AS returns_table) e)) AS function_info
   FROM hdb_catalog.hdb_function_agg;


ALTER TABLE hdb_catalog.hdb_function_info_agg OWNER TO postgres;

--
-- Name: hdb_permission; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_permission (
    table_schema name NOT NULL,
    table_name name NOT NULL,
    role_name text NOT NULL,
    perm_type text NOT NULL,
    perm_def jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false,
    CONSTRAINT hdb_permission_perm_type_check CHECK ((perm_type = ANY (ARRAY['insert'::text, 'select'::text, 'update'::text, 'delete'::text])))
);


ALTER TABLE hdb_catalog.hdb_permission OWNER TO postgres;

--
-- Name: hdb_permission_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_permission_agg AS
 SELECT hdb_permission.table_schema,
    hdb_permission.table_name,
    hdb_permission.role_name,
    json_object_agg(hdb_permission.perm_type, hdb_permission.perm_def) AS permissions
   FROM hdb_catalog.hdb_permission
  GROUP BY hdb_permission.table_schema, hdb_permission.table_name, hdb_permission.role_name;


ALTER TABLE hdb_catalog.hdb_permission_agg OWNER TO postgres;

--
-- Name: hdb_primary_key; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_primary_key AS
 SELECT tc.table_schema,
    tc.table_name,
    tc.constraint_name,
    json_agg(constraint_column_usage.column_name) AS columns
   FROM (information_schema.table_constraints tc
     JOIN ( SELECT x.tblschema AS table_schema,
            x.tblname AS table_name,
            x.colname AS column_name,
            x.cstrname AS constraint_name
           FROM ( SELECT DISTINCT nr.nspname,
                    r.relname,
                    a.attname,
                    c.conname
                   FROM pg_namespace nr,
                    pg_class r,
                    pg_attribute a,
                    pg_depend d,
                    pg_namespace nc,
                    pg_constraint c
                  WHERE ((nr.oid = r.relnamespace) AND (r.oid = a.attrelid) AND (d.refclassid = ('pg_class'::regclass)::oid) AND (d.refobjid = r.oid) AND (d.refobjsubid = a.attnum) AND (d.classid = ('pg_constraint'::regclass)::oid) AND (d.objid = c.oid) AND (c.connamespace = nc.oid) AND (c.contype = 'c'::"char") AND (r.relkind = ANY (ARRAY['r'::"char", 'p'::"char"])) AND (NOT a.attisdropped))
                UNION ALL
                 SELECT nr.nspname,
                    r.relname,
                    a.attname,
                    c.conname
                   FROM pg_namespace nr,
                    pg_class r,
                    pg_attribute a,
                    pg_namespace nc,
                    pg_constraint c
                  WHERE ((nr.oid = r.relnamespace) AND (r.oid = a.attrelid) AND (nc.oid = c.connamespace) AND (r.oid =
                        CASE c.contype
                            WHEN 'f'::"char" THEN c.confrelid
                            ELSE c.conrelid
                        END) AND (a.attnum = ANY (
                        CASE c.contype
                            WHEN 'f'::"char" THEN c.confkey
                            ELSE c.conkey
                        END)) AND (NOT a.attisdropped) AND (c.contype = ANY (ARRAY['p'::"char", 'u'::"char", 'f'::"char"])) AND (r.relkind = ANY (ARRAY['r'::"char", 'p'::"char"])))) x(tblschema, tblname, colname, cstrname)) constraint_column_usage ON ((((tc.constraint_name)::text = (constraint_column_usage.constraint_name)::text) AND ((tc.table_schema)::text = (constraint_column_usage.table_schema)::text) AND ((tc.table_name)::text = (constraint_column_usage.table_name)::text))))
  WHERE ((tc.constraint_type)::text = 'PRIMARY KEY'::text)
  GROUP BY tc.table_schema, tc.table_name, tc.constraint_name;


ALTER TABLE hdb_catalog.hdb_primary_key OWNER TO postgres;

--
-- Name: hdb_query_collection; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_query_collection (
    collection_name text NOT NULL,
    collection_defn jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false
);


ALTER TABLE hdb_catalog.hdb_query_collection OWNER TO postgres;

--
-- Name: hdb_relationship; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_relationship (
    table_schema name NOT NULL,
    table_name name NOT NULL,
    rel_name text NOT NULL,
    rel_type text,
    rel_def jsonb NOT NULL,
    comment text,
    is_system_defined boolean DEFAULT false,
    CONSTRAINT hdb_relationship_rel_type_check CHECK ((rel_type = ANY (ARRAY['object'::text, 'array'::text])))
);


ALTER TABLE hdb_catalog.hdb_relationship OWNER TO postgres;

--
-- Name: hdb_role; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_role AS
 SELECT DISTINCT q.role_name
   FROM ( SELECT hdb_permission.role_name
           FROM hdb_catalog.hdb_permission
        UNION ALL
         SELECT hdb_action_permission.role_name
           FROM hdb_catalog.hdb_action_permission) q;


ALTER TABLE hdb_catalog.hdb_role OWNER TO postgres;

--
-- Name: hdb_schema_update_event; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_update_event (
    instance_id uuid NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() NOT NULL,
    invalidations json NOT NULL
);


ALTER TABLE hdb_catalog.hdb_schema_update_event OWNER TO postgres;

--
-- Name: hdb_table; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_table (
    table_schema name NOT NULL,
    table_name name NOT NULL,
    configuration jsonb,
    is_system_defined boolean DEFAULT false,
    is_enum boolean DEFAULT false NOT NULL
);


ALTER TABLE hdb_catalog.hdb_table OWNER TO postgres;

--
-- Name: hdb_table_info_agg; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_table_info_agg AS
 SELECT schema.nspname AS table_schema,
    "table".relname AS table_name,
    jsonb_build_object('oid', ("table".oid)::integer, 'columns', COALESCE(columns.info, '[]'::jsonb), 'primary_key', primary_key.info, 'unique_constraints', COALESCE(unique_constraints.info, '[]'::jsonb), 'foreign_keys', COALESCE(foreign_key_constraints.info, '[]'::jsonb), 'view_info',
        CASE "table".relkind
            WHEN 'v'::"char" THEN jsonb_build_object('is_updatable', ((pg_relation_is_updatable(("table".oid)::regclass, true) & 4) = 4), 'is_insertable', ((pg_relation_is_updatable(("table".oid)::regclass, true) & 8) = 8), 'is_deletable', ((pg_relation_is_updatable(("table".oid)::regclass, true) & 16) = 16))
            ELSE NULL::jsonb
        END, 'description', description.description) AS info
   FROM ((((((pg_class "table"
     JOIN pg_namespace schema ON ((schema.oid = "table".relnamespace)))
     LEFT JOIN pg_description description ON (((description.classoid = ('pg_class'::regclass)::oid) AND (description.objoid = "table".oid) AND (description.objsubid = 0))))
     LEFT JOIN LATERAL ( SELECT jsonb_agg(jsonb_build_object('name', "column".attname, 'position', "column".attnum, 'type', COALESCE(base_type.typname, type.typname), 'is_nullable', (NOT "column".attnotnull), 'description', col_description("table".oid, ("column".attnum)::integer))) AS info
           FROM ((pg_attribute "column"
             LEFT JOIN pg_type type ON ((type.oid = "column".atttypid)))
             LEFT JOIN pg_type base_type ON (((type.typtype = 'd'::"char") AND (base_type.oid = type.typbasetype))))
          WHERE (("column".attrelid = "table".oid) AND ("column".attnum > 0) AND (NOT "column".attisdropped))) columns ON (true))
     LEFT JOIN LATERAL ( SELECT jsonb_build_object('constraint', jsonb_build_object('name', class.relname, 'oid', (class.oid)::integer), 'columns', COALESCE(columns_1.info, '[]'::jsonb)) AS info
           FROM ((pg_index index
             JOIN pg_class class ON ((class.oid = index.indexrelid)))
             LEFT JOIN LATERAL ( SELECT jsonb_agg("column".attname) AS info
                   FROM pg_attribute "column"
                  WHERE (("column".attrelid = "table".oid) AND ("column".attnum = ANY ((index.indkey)::smallint[])))) columns_1 ON (true))
          WHERE ((index.indrelid = "table".oid) AND index.indisprimary)) primary_key ON (true))
     LEFT JOIN LATERAL ( SELECT jsonb_agg(jsonb_build_object('name', class.relname, 'oid', (class.oid)::integer)) AS info
           FROM (pg_index index
             JOIN pg_class class ON ((class.oid = index.indexrelid)))
          WHERE ((index.indrelid = "table".oid) AND index.indisunique AND (NOT index.indisprimary))) unique_constraints ON (true))
     LEFT JOIN LATERAL ( SELECT jsonb_agg(jsonb_build_object('constraint', jsonb_build_object('name', foreign_key.constraint_name, 'oid', foreign_key.constraint_oid), 'columns', foreign_key.columns, 'foreign_table', jsonb_build_object('schema', foreign_key.ref_table_table_schema, 'name', foreign_key.ref_table), 'foreign_columns', foreign_key.ref_columns)) AS info
           FROM hdb_catalog.hdb_foreign_key_constraint foreign_key
          WHERE ((foreign_key.table_schema = (schema.nspname)::text) AND (foreign_key.table_name = ("table".relname)::text))) foreign_key_constraints ON (true))
  WHERE ("table".relkind = ANY (ARRAY['r'::"char", 't'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"]));


ALTER TABLE hdb_catalog.hdb_table_info_agg OWNER TO postgres;

--
-- Name: hdb_unique_constraint; Type: VIEW; Schema: hdb_catalog; Owner: postgres
--

CREATE VIEW hdb_catalog.hdb_unique_constraint AS
 SELECT tc.table_name,
    tc.constraint_schema AS table_schema,
    tc.constraint_name,
    json_agg(kcu.column_name) AS columns
   FROM (information_schema.table_constraints tc
     JOIN information_schema.key_column_usage kcu USING (constraint_schema, constraint_name))
  WHERE ((tc.constraint_type)::text = 'UNIQUE'::text)
  GROUP BY tc.table_name, tc.constraint_schema, tc.constraint_name;


ALTER TABLE hdb_catalog.hdb_unique_constraint OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: migration_settings; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.migration_settings (
    setting text NOT NULL,
    value text NOT NULL
);


ALTER TABLE hdb_catalog.migration_settings OWNER TO postgres;

--
-- Name: remote_schemas; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.remote_schemas (
    id bigint NOT NULL,
    name text,
    definition json,
    comment text
);


ALTER TABLE hdb_catalog.remote_schemas OWNER TO postgres;

--
-- Name: remote_schemas_id_seq; Type: SEQUENCE; Schema: hdb_catalog; Owner: postgres
--

CREATE SEQUENCE hdb_catalog.remote_schemas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hdb_catalog.remote_schemas_id_seq OWNER TO postgres;

--
-- Name: remote_schemas_id_seq; Type: SEQUENCE OWNED BY; Schema: hdb_catalog; Owner: postgres
--

ALTER SEQUENCE hdb_catalog.remote_schemas_id_seq OWNED BY hdb_catalog.remote_schemas.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE hdb_catalog.schema_migrations OWNER TO postgres;

--
-- Name: annotations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.annotations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    document_id uuid NOT NULL,
    label_id uuid,
    manual boolean DEFAULT false NOT NULL,
    data jsonb NOT NULL,
    is_submit boolean DEFAULT false NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.annotations OWNER TO postgres;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    project_id uuid NOT NULL,
    meta jsonb,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- Name: labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.labels (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    hotkey character varying NOT NULL,
    color character varying NOT NULL,
    project_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.labels OWNER TO postgres;

--
-- Name: notification_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification_types (
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.notification_types OWNER TO postgres;

--
-- Name: project_contributors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_contributors (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    role_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid NOT NULL
);


ALTER TABLE public.project_contributors OWNER TO postgres;

--
-- Name: project_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_notifications (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    notification_type text NOT NULL,
    addition_data jsonb NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    target_id uuid NOT NULL,
    sender_id uuid NOT NULL
);


ALTER TABLE public.project_notifications OWNER TO postgres;

--
-- Name: project_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_types (
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.project_types OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    guideline text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    project_type text NOT NULL,
    randomize_document_order boolean DEFAULT false NOT NULL,
    collaborative_annotation boolean DEFAULT false NOT NULL,
    annotator_per_example integer DEFAULT 3 NOT NULL,
    is_public boolean DEFAULT false NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    owner_id uuid NOT NULL,
    published_date timestamp with time zone,
    due_date timestamp with time zone,
    check_dates jsonb DEFAULT jsonb_build_array(),
    is_deleted boolean DEFAULT false,
    CONSTRAINT project_name_length CHECK ((char_length(name) <= 50))
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: role_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_types (
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.role_types OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    auth0_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now(),
    name text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: remote_schemas id; Type: DEFAULT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas ALTER COLUMN id SET DEFAULT nextval('hdb_catalog.remote_schemas_id_seq'::regclass);


--
-- Data for Name: event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: event_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_log (id, schema_name, table_name, trigger_name, payload, delivered, error, tries, created_at, locked, next_retry_at, archived) FROM stdin;
\.


--
-- Data for Name: event_triggers; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_triggers (name, type, schema_name, table_name, configuration, comment) FROM stdin;
\.


--
-- Data for Name: hdb_action; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action (action_name, action_defn, comment, is_system_defined) FROM stdin;
checkAndRegisterUser	{"kind": "synchronous", "handler": "{{ACTIONS_BASE_URL}}/api/checkAndRegisterUser?code=ZRMQ6cAJvPiZlewRTbrDo0O9gQsucfXIY2i4/kBGi6B2KRK5k2r4fA==", "headers": [], "arguments": [], "output_type": "CheckAndRegisterUserOutput", "forward_client_headers": true}	\N	f
fileUpload	{"kind": "synchronous", "type": "mutation", "handler": "http://host.docker.internal:3001/fileUpload", "headers": [], "arguments": [{"name": "name", "type": "String!", "description": null}, {"name": "type", "type": "String!", "description": null}, {"name": "base64str", "type": "String!", "description": null}], "output_type": "fileOutput", "forward_client_headers": true}	\N	f
\.


--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_action_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action_permission (action_name, role_name, definition, comment) FROM stdin;
checkAndRegisterUser	user	{}	\N
fileUpload	user	{}	\N
\.


--
-- Data for Name: hdb_allowlist; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_allowlist (collection_name) FROM stdin;
\.


--
-- Data for Name: hdb_computed_field; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_computed_field (table_schema, table_name, computed_field_name, definition, comment) FROM stdin;
\.


--
-- Data for Name: hdb_custom_types; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_custom_types (custom_types) FROM stdin;
{"enums": [], "objects": [{"name": "CheckAndRegisterUserOutput", "fields": [{"name": "affected_rows", "type": "Int!", "arguments": null, "description": null}], "description": null, "relationships": null}, {"name": "AddResult", "fields": [{"name": "sum", "type": "Int", "arguments": null, "description": null}], "description": null, "relationships": null}, {"name": "fileOutput", "fields": [{"name": "file_path", "type": "String!", "arguments": null, "description": null}], "description": null, "relationships": null}], "scalars": [], "input_objects": []}
\.


--
-- Data for Name: hdb_function; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_function (function_schema, function_name, configuration, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_permission (table_schema, table_name, role_name, perm_type, perm_def, comment, is_system_defined) FROM stdin;
public	projects	user	insert	{"set": {"owner_id": "x-hasura-user-id"}, "check": {"owner_id": {"_eq": "X-Hasura-User-Id"}}, "columns": ["annotator_per_example", "collaborative_annotation", "description", "guideline", "name", "project_type", "randomize_document_order"]}	\N	f
public	projects	user	delete	{"filter": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}	\N	f
public	annotations	user	update	{"set": {}, "filter": {"_and": [{"user_id": {"_eq": "X-Hasura-User-Id"}}, {"is_submit": {"_eq": false}}]}, "columns": ["data", "is_submit", "label_id"]}	\N	f
public	project_contributors	user	select	{"filter": {"_or": [{"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}, {"user_id": {"_eq": "X-Hasura-User-Id"}}]}, "columns": ["created_at", "id", "project_id", "role_type", "user_id"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	annotations	user	insert	{"set": {"user_id": "x-hasura-user-id"}, "check": {"_or": [{"_and": [{"document": {"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}}, {"document": {"project": {"project_contributors": {"role_type": {"_in": ["project_admin", "annotator"]}}}}}]}, {"document": {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}}]}, "columns": ["data", "document_id", "label_id"]}	\N	f
public	project_notifications	user	select	{"filter": {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_in": ["project_admin"]}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}, {"user": {"id": {"_eq": "X-Hasura-User-Id"}}}]}, "columns": ["addition_data", "created_at", "id", "is_read", "notification_type", "sender_id", "target_id"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	projects	user	select	{"filter": {"_and": [{"_or": [{"is_public": {"_eq": true}}, {"owner_id": {"_eq": "X-Hasura-User-Id"}}, {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}]}, {"is_deleted": {"_eq": false}}]}, "columns": ["annotator_per_example", "check_dates", "collaborative_annotation", "created_at", "description", "due_date", "guideline", "id", "is_public", "name", "owner_id", "project_type", "published_date", "randomize_document_order", "updated_at"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	users	user	update	{"set": {}, "filter": {"id": {"_eq": "X-Hasura-User-Id"}}, "columns": []}	\N	f
public	annotations	user	delete	{"filter": {"_and": [{"user_id": {"_eq": "X-Hasura-User-Id"}}, {"is_submit": {"_eq": false}}]}}	\N	f
public	annotations	user	select	{"filter": {"_or": [{"user_id": {"_eq": "X-Hasura-User-Id"}}, {"_and": [{"document": {"project": {"project_contributors": {"user_id": {"_ne": "X-Hasura-User-Id"}}}}}, {"document": {"project": {"project_contributors": {"role_type": {"_in": ["project_admin", "annotation_approver"]}}}}}, {"is_submit": {"_eq": true}}]}]}, "columns": ["data", "document_id", "id", "is_submit", "label_id", "manual", "user_id"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	documents	user	delete	{"filter": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}}	\N	f
public	documents	user	select	{"filter": {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_in": ["project_admin", "annotator", "annotation_approver"]}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}, "columns": ["created_at", "id", "meta", "project_id", "text"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	documents	user	insert	{"set": {}, "check": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}, "columns": ["meta", "project_id", "text"]}	\N	f
public	labels	user	delete	{"filter": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}}	\N	f
public	labels	user	select	{"filter": {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_in": ["project_admin", "annotator", "annotation_approver"]}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}, "columns": ["color", "created_at", "hotkey", "id", "project_id", "text"], "computed_fields": [], "allow_aggregations": true}	\N	f
public	labels	user	update	{"set": {}, "filter": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}, "columns": ["color", "hotkey", "text"]}	\N	f
public	labels	user	insert	{"set": {}, "check": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}, "columns": ["color", "hotkey", "project_id", "text"]}	\N	f
public	project_contributors	user	delete	{"filter": {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}}	\N	f
public	project_contributors	user	insert	{"set": {}, "check": {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}, "columns": ["project_id", "role_type", "user_id"]}	\N	f
public	project_notifications	user	update	{"set": {}, "filter": {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_in": ["project_admin"]}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}, "columns": ["is_read"]}	\N	f
public	users	user	select	{"filter": {}, "columns": ["auth0_id", "created_at", "id", "last_seen", "name"], "computed_fields": [], "allow_aggregations": false}	\N	f
public	users	user	delete	{"filter": {"id": {"_eq": "X-Hasura-User-Id"}}}	\N	f
public	documents	user	update	{"set": {}, "filter": {"_and": [{"project": {"is_public": {"_eq": false}}}, {"_or": [{"_and": [{"project": {"project_contributors": {"user_id": {"_eq": "X-Hasura-User-Id"}}}}, {"project": {"project_contributors": {"role_type": {"_eq": "project_admin"}}}}]}, {"project": {"owner_id": {"_eq": "X-Hasura-User-Id"}}}]}]}, "columns": ["meta", "text"]}	\N	f
public	project_notifications	user	insert	{"set": {"sender_id": "x-hasura-user-id"}, "check": {"sender_id": {"_eq": "X-Hasura-User-Id"}}, "columns": ["addition_data", "created_at", "id", "is_read", "notification_type", "sender_id", "target_id"]}	\N	f
public	projects	user	update	{"set": {}, "filter": {"owner_id": {"_eq": "X-Hasura-User-Id"}}, "columns": ["annotator_per_example", "check_dates", "collaborative_annotation", "description", "due_date", "guideline", "is_deleted", "is_public", "name", "published_date", "randomize_document_order"]}	\N	f
\.


--
-- Data for Name: hdb_query_collection; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_query_collection (collection_name, collection_defn, comment, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_relationship; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) FROM stdin;
hdb_catalog	hdb_table	detail	object	{"manual_configuration": {"remote_table": {"name": "tables", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	primary_key	object	{"manual_configuration": {"remote_table": {"name": "hdb_primary_key", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	columns	array	{"manual_configuration": {"remote_table": {"name": "columns", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	foreign_key_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_foreign_key_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	relationships	array	{"manual_configuration": {"remote_table": {"name": "hdb_relationship", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	computed_fields	array	{"manual_configuration": {"remote_table": {"name": "hdb_computed_field", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	check_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_check_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	unique_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_unique_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	event_triggers	events	array	{"manual_configuration": {"remote_table": {"name": "event_log", "schema": "hdb_catalog"}, "column_mapping": {"name": "trigger_name"}}}	\N	t
hdb_catalog	event_log	trigger	object	{"manual_configuration": {"remote_table": {"name": "event_triggers", "schema": "hdb_catalog"}, "column_mapping": {"trigger_name": "name"}}}	\N	t
hdb_catalog	event_log	logs	array	{"foreign_key_constraint_on": {"table": {"name": "event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}	\N	t
hdb_catalog	event_invocation_logs	event	object	{"foreign_key_constraint_on": "event_id"}	\N	t
hdb_catalog	hdb_function_agg	return_table_info	object	{"manual_configuration": {"remote_table": {"name": "hdb_table", "schema": "hdb_catalog"}, "column_mapping": {"return_type_name": "table_name", "return_type_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_action	permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_action_permission", "schema": "hdb_catalog"}, "column_mapping": {"action_name": "action_name"}}}	\N	t
hdb_catalog	hdb_role	action_permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_action_permission", "schema": "hdb_catalog"}, "column_mapping": {"role_name": "role_name"}}}	\N	t
hdb_catalog	hdb_role	permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"role_name": "role_name"}}}	\N	t
public	annotations	document	object	{"foreign_key_constraint_on": "document_id"}	\N	f
public	documents	project	object	{"foreign_key_constraint_on": "project_id"}	\N	f
public	documents	annotations	array	{"foreign_key_constraint_on": {"table": {"name": "annotations", "schema": "public"}, "column": "document_id"}}	\N	f
public	project_types	projects	array	{"foreign_key_constraint_on": {"table": {"name": "projects", "schema": "public"}, "column": "project_type"}}	\N	f
public	projects	projectType	object	{"foreign_key_constraint_on": "project_type"}	\N	f
public	projects	documents	array	{"foreign_key_constraint_on": {"table": {"name": "documents", "schema": "public"}, "column": "project_id"}}	\N	f
public	project_contributors	project	object	{"foreign_key_constraint_on": "project_id"}	\N	f
public	projects	project_contributors	array	{"foreign_key_constraint_on": {"table": {"name": "project_contributors", "schema": "public"}, "column": "project_id"}}	\N	f
public	role_types	project_contributors	array	{"foreign_key_constraint_on": {"table": {"name": "project_contributors", "schema": "public"}, "column": "role_type"}}	\N	f
public	project_contributors	roleType	object	{"foreign_key_constraint_on": "role_type"}	\N	f
public	labels	project	object	{"foreign_key_constraint_on": "project_id"}	\N	f
public	projects	labels	array	{"foreign_key_constraint_on": {"table": {"name": "labels", "schema": "public"}, "column": "project_id"}}	\N	f
public	annotations	label	object	{"foreign_key_constraint_on": "label_id"}	\N	f
public	labels	annotations	array	{"foreign_key_constraint_on": {"table": {"name": "annotations", "schema": "public"}, "column": "label_id"}}	\N	f
public	project_notifications	project	object	{"foreign_key_constraint_on": "target_id"}	\N	f
public	project_notifications	notificationType	object	{"foreign_key_constraint_on": "notification_type"}	\N	f
public	notification_types	project_notifications	array	{"foreign_key_constraint_on": {"table": {"name": "project_notifications", "schema": "public"}, "column": "notification_type"}}	\N	f
public	projects	project_notifications	array	{"foreign_key_constraint_on": {"table": {"name": "project_notifications", "schema": "public"}, "column": "target_id"}}	\N	f
public	annotations	user	object	{"foreign_key_constraint_on": "user_id"}	\N	f
public	project_contributors	user	object	{"foreign_key_constraint_on": "user_id"}	\N	f
public	project_notifications	user	object	{"foreign_key_constraint_on": "sender_id"}	\N	f
public	projects	user	object	{"foreign_key_constraint_on": "owner_id"}	\N	f
public	users	annotations	array	{"foreign_key_constraint_on": {"table": {"name": "annotations", "schema": "public"}, "column": "user_id"}}	\N	f
public	users	projects	array	{"foreign_key_constraint_on": {"table": {"name": "projects", "schema": "public"}, "column": "owner_id"}}	\N	f
public	users	project_contributors	array	{"foreign_key_constraint_on": {"table": {"name": "project_contributors", "schema": "public"}, "column": "user_id"}}	\N	f
public	users	project_notifications	array	{"foreign_key_constraint_on": {"table": {"name": "project_notifications", "schema": "public"}, "column": "sender_id"}}	\N	f
\.


--
-- Data for Name: hdb_schema_update_event; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_update_event (instance_id, occurred_at, invalidations) FROM stdin;
c772b897-d161-476a-a053-7b0964639dd1	2020-06-03 12:20:58.726156+00	{"metadata":false,"remote_schemas":[]}
\.


--
-- Data for Name: hdb_table; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) FROM stdin;
information_schema	tables	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
information_schema	schemata	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
information_schema	views	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
information_schema	columns	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_table	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_primary_key	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_foreign_key_constraint	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_relationship	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_permission_agg	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_computed_field	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_check_constraint	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_unique_constraint	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	event_triggers	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	event_log	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	event_invocation_logs	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function_agg	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	remote_schemas	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_version	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_query_collection	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_allowlist	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_custom_types	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_action_permission	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_action	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_action_log	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_role	{"custom_root_fields": {}, "custom_column_names": {}}	t	f
public	annotations	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	documents	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	project_types	{"custom_root_fields": {}, "custom_column_names": {}}	f	t
public	projects	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	users	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	role_types	{"custom_root_fields": {}, "custom_column_names": {}}	f	t
public	project_contributors	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	labels	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
public	notification_types	{"custom_root_fields": {}, "custom_column_names": {}}	f	t
public	project_notifications	{"custom_root_fields": {}, "custom_column_names": {}}	f	f
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
7da30621-8408-45d3-88b9-4eedb88c7214	34	2020-04-11 11:46:20.873091+00	{}	{"telemetryNotificationShown": true}
\.


--
-- Data for Name: migration_settings; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.migration_settings (setting, value) FROM stdin;
migration_mode	true
\.


--
-- Data for Name: remote_schemas; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.remote_schemas (id, name, definition, comment) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.schema_migrations (version, dirty) FROM stdin;
1587336563631	f
1587351282860	f
1588719172182	f
1589181581256	f
1589181594319	f
1589181666462	f
1590250076910	f
1590250091918	f
1591186174245	f
\.


--
-- Data for Name: annotations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.annotations (id, document_id, label_id, manual, data, is_submit, user_id, created_at) FROM stdin;
f3c296b1-fee3-4006-8e7c-f7c5d245cfea	044e248d-8ec9-4ddc-9eeb-00ad85214e95	5a96935e-b201-4808-a253-28656e49a856	f	{"text": "vietnamese"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
9469d056-0ee5-4e50-aa11-0c7594068960	4de87f38-25a9-4877-a871-341136d28ec4	5a96935e-b201-4808-a253-28656e49a856	f	{"text": "[Show Champion] [Bản phát hành đầu tiên] Park Girl-BAZOOKA! (Các cô gái trong Công viên-BAZOOKA!) L EP.351"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
ea2174f4-9954-4ee7-a80f-3ee240767317	4de87f38-25a9-4877-a871-341136d28ec4	20034249-4de8-4615-b17c-de2c9377c210	f	{"text": "[Show Champion] [First Release] Park Girl-BAZOOKA! (Girls in the Park-BAZOOKA!) L EP.351"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
3a079761-ce6b-4946-83c3-e957df1c3b9b	f859065c-4a56-4cce-90c4-bc03b8f1530a	20034249-4de8-4615-b17c-de2c9377c210	f	{"text": "[Show Champion] April-LALALILALA (APRIL-LALALILALA) l EP.351"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
b32da975-2b62-44ff-bb67-49179151ee1b	f859065c-4a56-4cce-90c4-bc03b8f1530a	5a96935e-b201-4808-a253-28656e49a856	f	{"text": "[Show Champion] Tháng 4-LALALILALA (APRIL-LALALILALA) l EP.351"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
425f37d6-6237-43cc-8420-27c03dc48b3f	5169eaad-bbcf-470a-893a-03ccb7811059	b970f05f-ac01-4248-88eb-43af34197636	f	{"text": "Sample C"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
b1376c96-fce6-4ad5-a819-1c87ddcbe8c8	5e9997e8-21d6-4590-b430-a325ed852455	b970f05f-ac01-4248-88eb-43af34197636	f	{"text": "Sample C"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
dd6ff85b-9e06-4c5c-8db6-9f9ade4255a7	fbafa2be-b3a5-4fb8-b2d0-d5e451a44df6	3eda3753-f4b7-4524-aff3-123369435337	f	{"tokens": ["OH\\nMY\\nGIRL"], "end_offset": 3, "label_text": "Sample C", "start_offset": 0}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
35fdd2e1-d1fc-4370-a0d9-a08017ccefc9	fbafa2be-b3a5-4fb8-b2d0-d5e451a44df6	f63f0bab-d8bc-401a-8c1a-bc998b968c45	f	{"tokens": ["NONSTOP"], "end_offset": 5, "label_text": "Sample B", "start_offset": 4}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
66972289-b0b0-4fdb-b79e-d45a102841cb	fbafa2be-b3a5-4fb8-b2d0-d5e451a44df6	7b8ab9fb-e09e-4944-b9e3-6aee370961e0	f	{"tokens": ["Line\\nDistribution"], "end_offset": 7, "label_text": "Sample A", "start_offset": 5}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
51c26ce5-4bd4-43df-8bd4-3d4c3f099f58	d3d9d134-4d80-4fef-814e-28c27d768e43	b970f05f-ac01-4248-88eb-43af34197636	f	{"text": "nothing"}	f	4dc14875-6719-47fd-bfcb-f87212ac2d64	2020-05-05 22:52:52.189065+00
508b9808-412d-4435-8292-a1ed6b362190	6ef1aa70-a7b7-46e4-9127-3c183a66b290	3eda3753-f4b7-4524-aff3-123369435337	f	{"tokens": ["Line"], "end_offset": 4, "label_text": "Sample C", "start_offset": 3}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
364242c3-8d41-44e6-861c-acf250f85ec1	05b9b4fe-0460-4d0e-8a7f-68c6be3cd7d0	7b8ab9fb-e09e-4944-b9e3-6aee370961e0	f	{"tokens": ["英雄"], "end_offset": 6, "label_text": "Sample C", "start_offset": 5}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
a6c7981d-1b29-40af-922a-ff6081b88493	6ef1aa70-a7b7-46e4-9127-3c183a66b290	7b8ab9fb-e09e-4944-b9e3-6aee370961e0	f	{"tokens": ["Distribution"], "end_offset": 5, "label_text": "Sample C", "start_offset": 4}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
0ce61560-244b-47bb-8e67-80e9c837767d	6ef1aa70-a7b7-46e4-9127-3c183a66b290	3eda3753-f4b7-4524-aff3-123369435337	f	{"tokens": ["(Color\\nCoded)"], "end_offset": 7, "label_text": "Sample A", "start_offset": 5}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-05 22:52:52.189065+00
07ff1684-d571-48ab-974e-338ee25cce2c	80dee997-a91e-4803-8d97-cac4fa488db4	d101756e-c4c3-46ea-a117-055c2e8618bf	f	{"tokens": ["葛馨怡"], "end_offset": 6, "label_text": "mer", "start_offset": 5}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 15:48:03.656621+00
4faab885-3b98-4401-9743-270193f25b93	c15bac68-c8ce-4b92-9a09-0365a22e47bf	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "dddddddddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:31:14.297214+00
d1f11e46-bf17-423c-b941-e40ae545ccf4	c15bac68-c8ce-4b92-9a09-0365a22e47bf	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "dddddddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:31:14.297214+00
a3e21b16-0b56-4e27-b893-f088c0da15a7	c15bac68-c8ce-4b92-9a09-0365a22e47bf	61a017a5-c590-4197-81ef-307850eb806b	f	{"text": "ddddddddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:31:14.297214+00
7b54513f-ab03-4089-abe8-8fe3da87e9de	c15bac68-c8ce-4b92-9a09-0365a22e47bf	61a017a5-c590-4197-81ef-307850eb806b	f	{"text": "dddddddddddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:31:14.297214+00
1c568617-bfeb-4678-8669-8ef8b612b079	c35eae2d-f335-4fce-983b-50b97aa322ac	61a017a5-c590-4197-81ef-307850eb806b	f	{"text": "hello world"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 10:14:32.071711+00
02334d3a-0935-4756-9f8a-399fdedf1166	0741be99-8d26-427f-b54c-dddf90625d17	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "hello"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 13:59:00.934338+00
bac24ce2-6152-42a7-8917-c8b399529afe	0741be99-8d26-427f-b54c-dddf90625d17	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": " world"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 13:59:00.934338+00
1c82b997-24c0-4d1d-9250-d8e204a87c79	0741be99-8d26-427f-b54c-dddf90625d17	61a017a5-c590-4197-81ef-307850eb806b	f	{"text": "constarrt"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 13:59:11.291007+00
5b66503a-ec6b-4dbc-b3f2-76b7c3814079	afd5a9e9-dd9c-4494-9c06-a238b252f93e	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "ddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:19:04.490678+00
3e4a1b3e-97a4-4672-9414-79316e05ac44	5f46f394-23a3-4396-b332-5fbf380cd63e	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:41:50.182495+00
07f68502-a17f-4347-9ab1-62fe31013fc1	5f46f394-23a3-4396-b332-5fbf380cd63e	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:41:50.182495+00
dd70d370-3a23-43b1-98e3-d80f078005b1	e6c8b152-8942-4dea-bd9e-6b293a8b0144	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:11.996742+00
086fccc1-c501-4c0d-b30a-72422bef0e4b	e6c8b152-8942-4dea-bd9e-6b293a8b0144	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:11.996742+00
8a459d73-6591-4ce1-bf45-2b7469633f2a	9cdead21-9d41-447b-9be2-e3771610d691	d101756e-c4c3-46ea-a117-055c2e8618bf	f	{"tokens": ["malesuada", "fames", ""], "end_offset": 4, "label_text": "mer", "start_offset": 2}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-31 08:13:00.981081+00
1ca8a79c-f690-4cd8-88d7-c59725020128	9cdead21-9d41-447b-9be2-e3771610d691	1d77aae9-0890-49f0-922f-7edcbc4e09ea	f	{"tokens": ["primis", "in", "faucibus"], "end_offset": 10, "label_text": "NE", "start_offset": 7}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-31 08:13:00.981081+00
7f49b8ed-1ff9-40da-b9a4-9987c77dbdd9	c35eae2d-f335-4fce-983b-50b97aa322ac	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "ddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:30:41.684753+00
dd3a6a19-133e-4a1a-a36f-00cd82ad146f	c35eae2d-f335-4fce-983b-50b97aa322ac	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "ddddddddd"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-05 17:30:41.684753+00
48cc38de-d307-4779-887a-00ba75468e6e	298ea6f9-8e1b-4e41-82c4-4acfaaf7ada2	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "CCS Concepts"}, "position": {"id": "222V", "rect": [54, 391.78125, 114.01761881510416, 403.1145833333333], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 54, "y": 403.1145833333333}, {"x": 114.01761881510416, "y": 403.1145833333333}, {"x": 54, "y": 391.78125}, {"x": 114.01761881510416, "y": 391.78125}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606191839+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606191839+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:18:43.57627+00
70ec63a8-04d8-4270-af59-3aaae309f5fb	298ea6f9-8e1b-4e41-82c4-4acfaaf7ada2	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "1  Introduction"}, "position": {"id": "710L", "rect": [54, 265.2916666666667, 140.44657389322919, 278.625], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 54, "y": 278.625}, {"x": 140.44657389322919, "y": 278.625}, {"x": 54, "y": 265.2916666666667}, {"x": 140.44657389322919, "y": 265.2916666666667}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606191922+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606191922+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:19:25.112112+00
f05dd50c-e5c2-46d7-8a87-0791b7728106	f6b19364-507e-41d2-9f3d-77dec3d10280	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "1  Introduction"}, "position": {"id": "467V", "rect": [54, 265.2916666666667, 140.44657389322919, 278.625], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 54, "y": 278.625}, {"x": 140.44657389322919, "y": 278.625}, {"x": 54, "y": 265.2916666666667}, {"x": 140.44657389322919, "y": 265.2916666666667}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606192025+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606192025+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:20:29.315374+00
3cc6bf11-2c32-41d5-be3b-cffbd9bfe315	f6b19364-507e-41d2-9f3d-77dec3d10280	02a9d936-c305-4bd8-89d7-1d64fa1e3e2c	f	{"contents": {"text": "Semantic subtyping enables simple, set-theoretical reason-"}, "position": {"id": "921Y", "rect": [54, 589.78125, 295.68570963541663, 601.1145833333334], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 54, "y": 601.1145833333334}, {"x": 295.68570963541663, "y": 601.1145833333334}, {"x": 54, "y": 589.78125}, {"x": 295.68570963541663, "y": 589.78125}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200607012549+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200607012549+07'00'"}, "label_text": "LT002", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 18:26:33.952611+00
5228bef7-8389-4add-aa17-ce3e1e61d95f	c35eae2d-f335-4fce-983b-50b97aa322ac	eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	f	{"text": "new new1"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 13:54:19.771568+00
30b3b668-e18e-42ff-b546-fa3136b1ca5a	b407a2ae-4b67-4eb4-bebc-b64165ab1d62	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:02.087639+00
2c1c30c3-fe93-48dc-8a0e-89e36a769362	b407a2ae-4b67-4eb4-bebc-b64165ab1d62	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:02.087639+00
24060f63-69fb-4125-91d8-d1204625871d	83a8df60-ee7a-4b6d-8abb-8cf9919f9af3	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:05.115955+00
9ff3a258-236c-4f79-abc4-2c2eeab27558	83a8df60-ee7a-4b6d-8abb-8cf9919f9af3	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:05.115955+00
e4ed33e4-dcda-458c-80f8-ee419032bd5a	659a3d0f-9c77-4465-bd91-73a3dd294d97	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:08.836079+00
477f4a3b-3ce8-4545-b806-bf047b2953fa	659a3d0f-9c77-4465-bd91-73a3dd294d97	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 14:42:08.836079+00
d1626b44-c2d2-4729-902b-e02a0b65ca28	46f21815-4767-4895-8b24-c5ca05deb9a2	d101756e-c4c3-46ea-a117-055c2e8618bf	f	{"tokens": ["Mauris"], "end_offset": 1, "label_text": "mer", "start_offset": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 15:28:18.56626+00
586c60f5-0651-4190-a876-20803489fc86	fd15811e-0c9f-4d33-ac8b-d0d485d95089	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "1  Introduction"}, "position": {"id": "111F", "rect": [53.989583333333336, 267.48958333333337, 140.4361572265625, 280.8229166666667], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 53.989583333333336, "y": 280.8229166666667}, {"x": 140.4361572265625, "y": 280.8229166666667}, {"x": 53.989583333333336, "y": 267.48958333333337}, {"x": 140.4361572265625, "y": 267.48958333333337}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606191909+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606191909+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:19:14.40732+00
7f8c666a-baf2-491f-9be8-7e506afa5c3b	fd15811e-0c9f-4d33-ac8b-d0d485d95089	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "Probabilistic Programming, Nested Markov Chains, Quanti-tative Error Bounds"}, "position": {"id": "512N", "rect": [53.989583333333336, 298.17708333333337, 292.7885335286458, 321.5104166666667], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 53.989583333333336, "y": 321.5104166666667}, {"x": 292.7885335286458, "y": 321.5104166666667}, {"x": 53.989583333333336, "y": 310.17708333333337}, {"x": 292.7885335286458, "y": 310.17708333333337}], [{"x": 53.989583333333336, "y": 309.5104166666667}, {"x": 132.96232096354166, "y": 309.5104166666667}, {"x": 53.989583333333336, "y": 298.17708333333337}, {"x": 132.96232096354166, "y": 298.17708333333337}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606192249+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606192249+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:22:55.819036+00
3bab082b-2799-4d2b-bcd1-b6a76fb5a27b	f6b19364-507e-41d2-9f3d-77dec3d10280	02a9d936-c305-4bd8-89d7-1d64fa1e3e2c	f	{"contents": {"image": "data:image/png;base64,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"}, "position": {"id": "086A", "rect": [67, 548.6666666666666, 291.66666666666663, 720.6666666666666], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 67, "y": 720.6666666666666}, {"x": 291.66666666666663, "y": 720.6666666666666}, {"x": 67, "y": 548.6666666666666}, {"x": 291.66666666666663, "y": 548.6666666666666}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606201552+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606201552+07'00'"}, "label_text": "LT002", "pageNumber": 1}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 13:15:58.514557+00
e8054366-c062-4562-ad1f-625eaeb778b4	f6b19364-507e-41d2-9f3d-77dec3d10280	6c2f786f-0b86-47fa-b7d7-ca8540d371f4	f	{"contents": {"text": "Decidable Tag-Based Semantic Subtyping"}, "position": {"id": "271K", "rect": [114.11458333333333, 697.7083333333333, 497.5139973958333, 721.0416666666666], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 114.11458333333333, "y": 721.0416666666666}, {"x": 497.5139973958333, "y": 721.0416666666666}, {"x": 114.11458333333333, "y": 697.7083333333333}, {"x": 497.5139973958333, "y": 697.7083333333333}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200607020002+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200607020002+07'00'"}, "label_text": "LT001", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 19:00:23.241603+00
cb621638-41d1-4c49-9b41-84dba8498f43	fc3f25a0-7674-4299-b88c-c76fa3b98f1e	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-29 17:20:55.952262+00
18c58b91-a040-47df-a966-908485239421	fc3f25a0-7674-4299-b88c-c76fa3b98f1e	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-29 17:20:55.952262+00
8d35b10f-a17b-4162-848e-4175982a6a4e	5f46f394-23a3-4396-b332-5fbf380cd63e	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-29 17:21:10.427924+00
bdd788bb-2589-4bb8-b493-9fd224d2384c	f6b19364-507e-41d2-9f3d-77dec3d10280	02a9d936-c305-4bd8-89d7-1d64fa1e3e2c	f	{"contents": {"text": "CCS Concepts"}, "position": {"id": "273N", "rect": [54, 391.78125, 114.01761881510416, 403.1145833333333], "title": "", "subtype": "Highlight", "contents": "", "hasPopup": true, "quadPoints": [[{"x": 54, "y": 403.1145833333333}, {"x": 114.01761881510416, "y": 403.1145833333333}, {"x": 54, "y": 391.78125}, {"x": 114.01761881510416, "y": 391.78125}]], "borderStyle": {"style": 1, "width": 1, "dashArray": [3], "verticalCornerRadius": 0, "horizontalCornerRadius": 0}, "creationDate": "D:20200606191954+07'00'", "hasAppearance": true, "annotationType": 9, "annotationFlags": 4, "modificationDate": "D:20200606191954+07'00'"}, "label_text": "LT002", "pageNumber": 0}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-06-06 12:19:57.790536+00
8842f2c2-e805-4b41-8c5e-152acd5add5c	c94f939a-81b3-44a4-8a10-84b389927c69	95b46328-2b5b-47db-918f-4e59fcb7d93b	f	{"text": "N"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 03:53:33.624627+00
ab6646e7-a39c-4625-b539-feb60234b4cd	c94f939a-81b3-44a4-8a10-84b389927c69	db758bd3-90ab-47cc-9091-4a937304cf2a	f	{"text": "P"}	f	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 03:53:33.624627+00
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, text, project_id, meta, created_at) FROM stdin;
6ef75fc9-b3f0-4431-98c1-70f682513f53	http://localhost:3001/files/HeThongDeTai.pdf	ad150350-8949-4aa6-82df-8963f499000b	\N	2020-05-13 03:08:35.198931+00
17d0d26e-ec70-421b-82c9-de4c745adf9f	https://arxiv.org/pdf/1912.08255.pdf	1e30c90d-2517-42f2-89f3-c1155f094a1d	\N	2020-05-22 08:53:37.899481+00
460a96b7-da75-465d-83bf-3a01c4a3cd8b	https://arxiv.org/pdf/1912.06791.pdf	1e30c90d-2517-42f2-89f3-c1155f094a1d	\N	2020-05-22 08:53:37.899481+00
7d725f29-857f-4537-a933-69e1bf691ef9	http://localhost:3001/files/1912.08255.pdf	1e30c90d-2517-42f2-89f3-c1155f094a1d	\N	2020-05-22 08:59:14.840307+00
298ea6f9-8e1b-4e41-82c4-4acfaaf7ada2	https://arxiv.org/pdf/1912.08255.pdf	16bbf236-045f-47ba-b169-5c3451e239bd	\N	2020-05-29 14:58:38.950724+00
fd15811e-0c9f-4d33-ac8b-d0d485d95089	https://arxiv.org/pdf/1912.06791.pdf	16bbf236-045f-47ba-b169-5c3451e239bd	\N	2020-05-29 14:58:38.950724+00
f6b19364-507e-41d2-9f3d-77dec3d10280	http://localhost:3001/files/1912.08255.pdf	16bbf236-045f-47ba-b169-5c3451e239bd	\N	2020-05-29 14:58:46.877227+00
5e9997e8-21d6-4590-b430-a325ed852455	Dreamcatcher(드림캐쳐) '데자부 (Deja Vu)' MV	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	\N	2020-04-25 01:51:36.050794+00
5169eaad-bbcf-470a-893a-03ccb7811059	Hi, i'm kinda new to VScode, and i know that it isn't an IDE but i still want to make an utility app for myself, here's my idea	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	\N	2020-04-25 01:53:19.05767+00
d3d9d134-4d80-4fef-814e-28c27d768e43	i want to have it running in my PC and Linux machine, my machines will have a folder linked between them, for example:	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	\N	2020-04-25 01:53:25.500397+00
05b9b4fe-0460-4d0e-8a7f-68c6be3cd7d0	NCT 127 엔시티 127 '영웅 (英雄; Kick It)' Performance Video\n	440aa411-7abd-4152-8863-1aa886f11fa1	\N	2020-04-29 01:01:31.829721+00
fbafa2be-b3a5-4fb8-b2d0-d5e451a44df6	OH MY GIRL - NONSTOP Line Distribution (Color Coded)\n	440aa411-7abd-4152-8863-1aa886f11fa1	\N	2020-04-29 01:01:49.482864+00
6ef1aa70-a7b7-46e4-9127-3c183a66b290	Apink - Dumhdurum Line Distribution (Color Coded)\n	440aa411-7abd-4152-8863-1aa886f11fa1	\N	2020-04-29 01:01:56.137429+00
db63282c-af6f-43d5-8771-97562741843a	https://arxiv.org/pdf/1912.08255.pdf	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	\N	2020-04-29 13:16:22.311205+00
3ec1254f-74e9-4e51-ba8c-aa55bde13c05	https://arxiv.org/pdf/2001.00007.pdf	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	\N	2020-04-29 13:17:19.825998+00
f859065c-4a56-4cce-90c4-bc03b8f1530a	[Show Champion] 에이프릴 - LALALILALA (APRIL - LALALILALA) l EP.351\n	8bc89b02-1c9c-4e95-922c-055db16f401e	\N	2020-04-29 14:09:29.09489+00
4de87f38-25a9-4877-a871-341136d28ec4	[Show Champion] [최초 공개] 공원소녀 - BAZOOKA! (Girls in the Park - BAZOOKA!) l EP.351	8bc89b02-1c9c-4e95-922c-055db16f401e	\N	2020-04-29 14:09:40.284698+00
044e248d-8ec9-4ddc-9eeb-00ad85214e95	[show champion/MC모음] 4월4주차 ♥얼굴챔피언♡ MC 딴콩민 (아스트로 문빈, 아스트로 산하, 베리베리 강민)	8bc89b02-1c9c-4e95-922c-055db16f401e	\N	2020-04-29 14:09:53.990984+00
e8085018-7f88-410a-a056-300e7d9b1a3e	hello world	a1d5801e-d863-44de-9ab6-11eee83bdbf8	\N	2020-06-02 10:56:32.059621+00
aea013e8-e7c7-4c25-a8a3-1500522fe7d0	new newnenwewnewnew\ndasdasdasd	a1d5801e-d863-44de-9ab6-11eee83bdbf8	\N	2020-06-02 10:58:40.740911+00
49a5ea5d-eafd-4a3f-a7d9-0aea1d32452e	hello	a1d5801e-d863-44de-9ab6-11eee83bdbf8	\N	2020-06-02 11:32:30.024317+00
5ddc6077-343e-4e2b-a82a-8f266cfc3f72	hello	a1d5801e-d863-44de-9ab6-11eee83bdbf8	\N	2020-06-02 11:32:34.752934+00
cb7424fe-1911-4e5d-b4da-fd8bcf39eddb	world	a1d5801e-d863-44de-9ab6-11eee83bdbf8	\N	2020-06-02 11:32:34.752934+00
722444e9-4531-49e3-a245-269703bed552	cccccccccccccccccccc	9904b817-0fd7-45f8-87ad-610f0f6c06cb	\N	2020-06-04 15:21:10.279204+00
a8207650-9d59-4aee-9081-f2931a924d56	bbbbbbbbbbb	9904b817-0fd7-45f8-87ad-610f0f6c06cb	\N	2020-06-04 15:21:15.761307+00
2fb20aa3-fc0d-4258-9f33-163b1accfb52	bbbbbbbbbbb	9904b817-0fd7-45f8-87ad-610f0f6c06cb	\N	2020-06-04 15:21:21.842025+00
c81a12ee-50d7-4237-9bf0-4eff434f0151	ggggggggggggggggggggg	9904b817-0fd7-45f8-87ad-610f0f6c06cb	\N	2020-06-04 15:21:21.842025+00
c642cf3e-a8ed-4eb4-8196-f820a58e3298	hhhhhhhhhhhhhhhhhhhh	9904b817-0fd7-45f8-87ad-610f0f6c06cb	\N	2020-06-04 15:21:21.842025+00
e6c8b152-8942-4dea-bd9e-6b293a8b0144	Lorem ipsum dolor sit amet, consectetur adipiscing elit	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.915714+00
83a8df60-ee7a-4b6d-8abb-8cf9919f9af3	Mauris eget efficitur lorem.	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.915714+00
659a3d0f-9c77-4465-bd91-73a3dd294d97	Interdum et malesuada fames ac ante ipsum primis in faucibus	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.915714+00
5f46f394-23a3-4396-b332-5fbf380cd63e	Lorem ipsum dolor sit amet, consectetur adipiscing elit	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.940159+00
c94f939a-81b3-44a4-8a10-84b389927c69	Mauris eget efficitur lorem.	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.940159+00
b407a2ae-4b67-4eb4-bebc-b64165ab1d62	Interdum et malesuada fames ac ante ipsum primis in faucibus	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:14.940159+00
fc3f25a0-7674-4299-b88c-c76fa3b98f1e	우주소녀(WJSN) - Boogie Up(부기업) 교차편집(stage mix)	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	\N	2020-05-29 09:47:50.645161+00
80dee997-a91e-4803-8d97-cac4fa488db4	Gia Ge “LOVER” FOCUSED CAMERA 葛馨怡《情人》舞台直拍 | Youth with You 2 青春有你2 | iQIYI	d09b2180-1850-4977-bc28-03b0913c427b	\N	2020-05-29 10:00:16.346738+00
7880834a-2dea-4c8a-b923-67412fe81ad4	Lorem ipsum dolor sit amet, consectetur adipiscing elit	d09b2180-1850-4977-bc28-03b0913c427b	\N	2020-05-29 10:04:18.01724+00
46f21815-4767-4895-8b24-c5ca05deb9a2	Mauris eget efficitur lorem.	d09b2180-1850-4977-bc28-03b0913c427b	\N	2020-05-29 10:04:18.01724+00
9cdead21-9d41-447b-9be2-e3771610d691	Interdum et malesuada fames ac ante ipsum primis in faucibus	d09b2180-1850-4977-bc28-03b0913c427b	\N	2020-05-29 10:04:18.01724+00
0741be99-8d26-427f-b54c-dddf90625d17	Lorem ipsum dolor sit amet, consectetur adipiscing elit	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:19.127247+00
f4b449a6-dcd6-44ae-8dea-161d64df8aac	Mauris eget efficitur lorem.	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:19.127247+00
b5d9078d-7b38-4990-b46e-0c7e07f294bf	Interdum et malesuada fames ac ante ipsum primis in faucibus	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:19.127247+00
afd5a9e9-dd9c-4494-9c06-a238b252f93e	Lorem ipsum dolor sit amet, consectetur adipiscing elit	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:35.86034+00
9000250d-ac2a-4e82-9fdb-229eb8113dab	Mauris eget efficitur lorem.	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:35.86034+00
e79ad624-0dfb-4c8e-9704-4e9829335876	Interdum et malesuada fames ac ante ipsum primis in faucibus	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:35.86034+00
c15bac68-c8ce-4b92-9a09-0365a22e47bf	Lorem ipsum dolor sit amet, consectetur adipiscing elit	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:43.709628+00
735a69c2-e6e7-4309-a782-76db66cc7276	Mauris eget efficitur lorem.	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:43.709628+00
c35eae2d-f335-4fce-983b-50b97aa322ac	Interdum et malesuada fames ac ante ipsum primis in faucibus	ee642523-da48-4821-b725-19b69651f26a	\N	2020-05-29 10:07:43.709628+00
\.


--
-- Data for Name: labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.labels (id, text, hotkey, color, project_id, created_at) FROM stdin;
15fac97e-5661-4706-b858-56aa507c8257	Sample A	A	#f5222d	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	2020-04-25 01:49:47.803637+00
f9002fbd-d56a-4969-90dc-5864f055e569	Sample B	b	#fa541c	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	2020-04-25 01:49:54.92189+00
b970f05f-ac01-4248-88eb-43af34197636	Sample C	c	#fa8c16	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	2020-04-25 01:50:03.77718+00
7b8ab9fb-e09e-4944-b9e3-6aee370961e0	Sample A	A	#f5222d	440aa411-7abd-4152-8863-1aa886f11fa1	2020-04-29 01:02:14.076715+00
3eda3753-f4b7-4524-aff3-123369435337	Sample C	c	#52c41a	440aa411-7abd-4152-8863-1aa886f11fa1	2020-04-29 01:02:32.480876+00
f63f0bab-d8bc-401a-8c1a-bc998b968c45	Sample B	b	#1890ff	440aa411-7abd-4152-8863-1aa886f11fa1	2020-04-29 01:02:21.079792+00
840ed2bb-6bed-4bb3-9c5b-5aee1c23b68f	Name 	a	#2f54eb	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	2020-04-29 13:17:39.52534+00
2ce8bd1d-4620-4bef-b767-207d141dee45	Sample 2	2	#eb2f96	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	2020-04-29 13:17:47.614776+00
dd4a9186-8166-4164-9911-17562d3f007f	Sample F	f	#52c41a	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	2020-04-29 13:17:56.404265+00
5a96935e-b201-4808-a253-28656e49a856	Vietnameses	v	#f5222d	8bc89b02-1c9c-4e95-922c-055db16f401e	2020-04-29 14:11:22.945216+00
20034249-4de8-4615-b17c-de2c9377c210	English	e	#1890ff	8bc89b02-1c9c-4e95-922c-055db16f401e	2020-04-29 14:11:36.994302+00
e302f3c0-b3a6-44dc-a7ba-9d781f60ed5e	Sample	A	#f5222d	ad150350-8949-4aa6-82df-8963f499000b	2020-05-12 06:54:49.228522+00
2ede9555-ddb1-4922-8f5f-646bf777dbdb	Sample A	a	#f5222d	1e30c90d-2517-42f2-89f3-c1155f094a1d	2020-05-22 09:26:55.133974+00
3e204983-54b3-4da9-a59c-df52182bf59e	Sample B	b	#fa8c16	1e30c90d-2517-42f2-89f3-c1155f094a1d	2020-05-22 09:27:10.179977+00
6c2f786f-0b86-47fa-b7d7-ca8540d371f4	LT001	1	#f5222d	16bbf236-045f-47ba-b169-5c3451e239bd	2020-05-29 16:31:46.373717+00
02a9d936-c305-4bd8-89d7-1d64fa1e3e2c	LT002	2	#fa541c	16bbf236-045f-47ba-b169-5c3451e239bd	2020-05-29 16:32:01.951979+00
95b46328-2b5b-47db-918f-4e59fcb7d93b	N	n	#f5222d	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	2020-05-29 16:41:09.570141+00
db758bd3-90ab-47cc-9091-4a937304cf2a	P	p	#fa8c16	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	2020-05-29 16:41:16.827556+00
61a017a5-c590-4197-81ef-307850eb806b	tect	t	#2f54eb	ee642523-da48-4821-b725-19b69651f26a	2020-05-30 04:11:10.590635+00
eeb94a3f-2c8f-4dad-8b7f-35cb5bdcfd5e	aaa	a	#722ed1	ee642523-da48-4821-b725-19b69651f26a	2020-05-30 04:11:19.440242+00
1d77aae9-0890-49f0-922f-7edcbc4e09ea	NE	n	#f5222d	d09b2180-1850-4977-bc28-03b0913c427b	2020-05-30 15:07:28.705467+00
d101756e-c4c3-46ea-a117-055c2e8618bf	mer	m	#722ed1	d09b2180-1850-4977-bc28-03b0913c427b	2020-05-30 15:07:40.102511+00
96cef1d4-4c3c-4e5c-baf4-b62160ac53b1	ccccccc	c	#DA8B45	a1d5801e-d863-44de-9ab6-11eee83bdbf8	2020-06-03 03:25:22.981737+00
4b110a59-281a-4a77-9a24-631a0d9e4cea	e	e	#6092C0	a1d5801e-d863-44de-9ab6-11eee83bdbf8	2020-06-03 03:28:40.109346+00
f06cf2be-4bf5-4f58-adc1-0548fdb08a0b	fffffff	f	#ad1466	a1d5801e-d863-44de-9ab6-11eee83bdbf8	2020-06-03 03:30:42.529796+00
f2244d6a-aa32-4e89-96f4-adbd25b138c9	jjjjjjj	j	#03b751	a1d5801e-d863-44de-9ab6-11eee83bdbf8	2020-06-03 03:31:08.117857+00
e2401c98-b0af-452a-91b5-4be51fa1fd5b	k	k	#54B399	a1d5801e-d863-44de-9ab6-11eee83bdbf8	2020-06-03 03:31:45.702635+00
999cdea7-6a4b-4ff7-aea2-13589a55375e	a	a	#54B399	9904b817-0fd7-45f8-87ad-610f0f6c06cb	2020-06-04 15:31:09.517518+00
e0c29a60-250e-4a1d-9846-17e09147905c	s	s	#6092C0	9904b817-0fd7-45f8-87ad-610f0f6c06cb	2020-06-04 15:31:47.733465+00
8f62cb43-9825-4f46-a449-aaa977b6d912	d	d	#D36086	9904b817-0fd7-45f8-87ad-610f0f6c06cb	2020-06-04 15:31:53.22568+00
\.


--
-- Data for Name: notification_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification_types (key, value) FROM stdin;
contributor_request	Contributor Request
admin_response	Admin Response
\.


--
-- Data for Name: project_contributors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_contributors (id, project_id, role_type, created_at, user_id) FROM stdin;
c6c5e2ba-5c36-45e1-9c13-6a99f792c1ae	d6a395da-5f36-47b9-b020-2efeb0839b09	annotator	2020-04-20 22:18:27.630297+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
fca4ee6a-6b99-4ef8-86bb-6a3f6985a742	d6a395da-5f36-47b9-b020-2efeb0839b09	annotation_approver	2020-04-20 22:18:54.407367+00	4dc14875-6719-47fd-bfcb-f87212ac2d64
8e2bb605-4109-47a0-935b-7a4064f0418c	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	annotation_approver	2020-04-20 22:28:15.138531+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
ff762c9d-ced0-480f-87bb-9ecb01a86c84	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	project_admin	2020-04-20 22:29:47.73199+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
77b8b6bf-807d-4bd1-ac72-b7b9b66636ab	1cdf583f-5ed8-4e46-a328-a805cb78add9	annotator	2020-04-21 10:46:22.052409+00	545aea2f-8288-405b-b8b2-b78c2afbc804
e5968781-5102-4734-a5c6-81eeb9a855ce	1cdf583f-5ed8-4e46-a328-a805cb78add9	annotation_approver	2020-04-21 10:46:30.317488+00	4dc14875-6719-47fd-bfcb-f87212ac2d64
6c238b86-a900-4eaf-954b-278cac975e60	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	annotator	2020-04-27 21:57:21.658694+00	4dc14875-6719-47fd-bfcb-f87212ac2d64
f7e05d64-4cf2-498e-9d29-7ecaaa7c0aa2	440aa411-7abd-4152-8863-1aa886f11fa1	project_admin	2020-05-25 03:17:54.577092+00	63ef80f2-0993-4056-ab83-990dbefcef23
9e731e8a-f789-4120-b4aa-01cb1562351d	440aa411-7abd-4152-8863-1aa886f11fa1	annotator	2020-05-25 03:31:21.175893+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
ac84c4b8-0eef-49dd-a738-51476f72bcd0	440aa411-7abd-4152-8863-1aa886f11fa1	annotator	2020-05-25 03:32:40.532968+00	545aea2f-8288-405b-b8b2-b78c2afbc804
27ea4942-55fd-4305-a7f1-8254b3567542	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	annotator	2020-05-29 16:45:09.211923+00	545aea2f-8288-405b-b8b2-b78c2afbc804
bc60bd08-c416-45ca-8172-3d7f336bef2c	a1d5801e-d863-44de-9ab6-11eee83bdbf8	annotator	2020-06-03 06:27:46.634889+00	545aea2f-8288-405b-b8b2-b78c2afbc804
78902c5f-53b6-4cb4-a0f5-2eef111a1f0a	a1d5801e-d863-44de-9ab6-11eee83bdbf8	annotation_approver	2020-06-03 06:44:41.70624+00	63ef80f2-0993-4056-ab83-990dbefcef23
f2088678-f2ae-4c9f-ade7-7ac1c5ae3566	a1d5801e-d863-44de-9ab6-11eee83bdbf8	annotator	2020-06-03 08:03:07.752891+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
\.


--
-- Data for Name: project_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_notifications (id, notification_type, addition_data, is_read, created_at, target_id, sender_id) FROM stdin;
1dab4f41-2cd1-49de-9f1d-ac2cfa7a6b76	contributor_request	{"role_type": "annotator"}	f	2020-05-24 10:11:48.004361+00	fb8114a2-46af-4df6-9bc0-12afd7d3ec56	4dc14875-6719-47fd-bfcb-f87212ac2d64
1f353a9f-f6d4-40cc-afee-8b784b06d598	contributor_request	{"role_type": "annotator"}	f	2020-05-24 11:32:40.344849+00	48d37f22-dfd5-4a0c-b79e-2cbbac215e31	545aea2f-8288-405b-b8b2-b78c2afbc804
0ad9d0e4-cd59-46f3-afdb-a4d77fdc7f01	contributor_request	{"role_type": "annotator"}	t	2020-06-03 08:03:05.607326+00	a1d5801e-d863-44de-9ab6-11eee83bdbf8	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
cdb45d75-2083-4fcf-8c36-957794813c29	contributor_request	{"role_type": "project_admin"}	f	2020-06-04 08:16:51.97216+00	1cdf583f-5ed8-4e46-a328-a805cb78add9	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
58e27557-df9d-4e8f-8d46-fe0c24925ac2	contributor_request	{"role_type": "annotator"}	f	2020-05-25 18:05:38.639433+00	1e30c90d-2517-42f2-89f3-c1155f094a1d	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
f4a1e460-9e57-448d-83d9-300d60babb23	contributor_request	{"role_type": "annotator"}	f	2020-05-24 11:46:33.9866+00	440aa411-7abd-4152-8863-1aa886f11fa1	545aea2f-8288-405b-b8b2-b78c2afbc804
22ab187e-d80b-4e0d-a91d-30d981c8f10d	contributor_request	{"role_type": "annotator"}	f	2020-05-25 02:41:31.564307+00	440aa411-7abd-4152-8863-1aa886f11fa1	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
d5d7cc31-fd45-4dde-87d5-0d378194fa2a	contributor_request	{"role_type": "annotator"}	f	2020-05-24 11:11:22.255584+00	8bc89b02-1c9c-4e95-922c-055db16f401e	545aea2f-8288-405b-b8b2-b78c2afbc804
bd0e2149-fb15-470e-9ed0-9418fd563d4d	contributor_request	{"role_type": "annotator"}	t	2020-05-29 16:44:59.420016+00	186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	545aea2f-8288-405b-b8b2-b78c2afbc804
55963c67-cbb2-4cfd-98a5-1a6454ee24ce	contributor_request	{"role_type": "annotator"}	t	2020-06-03 07:27:32.938364+00	a1d5801e-d863-44de-9ab6-11eee83bdbf8	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
b0fc9715-7595-43d0-a592-b5944fdf78cd	contributor_request	{"role_type": "annotator"}	t	2020-06-03 07:55:49.479691+00	a1d5801e-d863-44de-9ab6-11eee83bdbf8	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877
\.


--
-- Data for Name: project_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_types (key, value) FROM stdin;
TextClassificationProject	Sentiment Analysis
SequenceLabelingProject	Named Entity Recognition
Seq2seqProject	Translation
PdfLabelingProject	PDF Labeling
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, guideline, created_at, project_type, randomize_document_order, collaborative_annotation, annotator_per_example, is_public, updated_at, owner_id, published_date, due_date, check_dates, is_deleted) FROM stdin;
ad150350-8949-4aa6-82df-8963f499000b	newpdf	newpdf		2020-05-11 03:24:18.631209+00	PdfLabelingProject	t	t	3	f	2020-05-11 03:24:18.631209+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
d6a395da-5f36-47b9-b020-2efeb0839b09	n001	decs001		2020-04-20 04:06:41.467036+00	TextClassificationProject	t	t	2	f	2020-04-20 04:06:41.467036+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
1cdf583f-5ed8-4e46-a328-a805cb78add9	n001-sondh0127	n001-sondh0127		2020-04-20 21:18:34.613122+00	SequenceLabelingProject	t	t	1	t	2020-04-20 21:37:16.10877+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	\N	\N	[]	f
48d37f22-dfd5-4a0c-b79e-2cbbac215e31	n001-stephen	decs001 2333	**Guide line my guideline**	2020-04-20 04:05:34.831526+00	TextClassificationProject	t	t	3	t	2020-04-26 18:10:50.618573+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
440aa411-7abd-4152-8863-1aa886f11fa1	n002-stephen	n002-stephen	Guide-line Editor\n	2020-04-29 00:59:29.938711+00	SequenceLabelingProject	t	t	2	t	2020-04-29 01:03:52.88212+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
fb8114a2-46af-4df6-9bc0-12afd7d3ec56	name001-stephen	desc001-stephen	guide001-stephen	2020-04-20 03:04:59.959027+00	PdfLabelingProject	f	f	10	t	2020-04-29 13:18:46.160807+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
8bc89b02-1c9c-4e95-922c-055db16f401e	n003-stephen	n003-stephen		2020-04-29 14:08:59.404703+00	Seq2seqProject	t	t	2	t	2020-04-29 14:11:52.664076+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
f09b91f2-8590-4573-8b64-18b11efbb496	new pdf	new pdf		2020-05-22 06:47:44.464227+00	PdfLabelingProject	t	t	3	f	2020-05-22 06:47:44.464227+00	545aea2f-8288-405b-b8b2-b78c2afbc804	\N	\N	[]	f
1e30c90d-2517-42f2-89f3-c1155f094a1d	new pdf2	new pdf2	### Very long guideline	2020-05-22 06:49:01.698202+00	PdfLabelingProject	t	t	2	t	2020-05-24 04:05:57.568724+00	545aea2f-8288-405b-b8b2-b78c2afbc804	2020-05-24 03:56:48.04+00	2020-05-31 16:59:59.999+00	[{"date": "2020-05-25T23:59:59.999+07:00", "task": 1}, {"date": "2020-05-27T23:59:59.999+07:00", "task": 2}]	f
16bbf236-045f-47ba-b169-5c3451e239bd	sondh0127 - PDF	sondh0127 - PDF sondh0127 - PDF sondh0127 - PDF sondh0127 - PDF sondh0127 - PDF sondh0127 - PDF	### Annotation guideline for user\n[Markdown](https://www.markdownguide.org/getting-started)\n# Best	2020-05-29 10:12:59.242234+00	PdfLabelingProject	t	t	5	t	2020-05-29 16:40:30.186909+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-29 16:40:05.173+00	2020-06-06 16:59:59.999+00	[{"date": "2020-05-31T23:59:59.999+07:00", "task": 1}, {"date": "2020-06-02T23:59:59.999+07:00", "task": 2}]	f
186e5a87-6b68-4dbf-9ef7-d0c61c943fd5	sondh0127 - SA1	sondh0127 - SA1		2020-05-28 08:46:37.241055+00	TextClassificationProject	t	t	1	t	2020-05-29 16:41:37.348135+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-29 16:41:32.142+00	2020-06-06 16:59:59.999+00	[]	f
ee642523-da48-4821-b725-19b69651f26a	sondh0127-Trans	sondh0127-Trans	### Annotation guideline for user\n[Markdown](https://www.markdownguide.org/getting-started)	2020-05-29 10:05:19.500403+00	Seq2seqProject	t	t	4	t	2020-05-30 14:02:55.058432+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 04:11:20.761+00	\N	[{"date": "2020-05-31T23:59:59.999+07:00", "task": 1}, {"date": "2020-06-04T23:59:59.999+07:00", "task": 1}, {"date": "2020-06-16T23:59:59.999+07:00", "task": 7}]	f
d09b2180-1850-4977-bc28-03b0913c427b	sondh0127 - NER01	sondh0127 - NER01		2020-05-28 08:49:15.373407+00	SequenceLabelingProject	t	t	1	t	2020-05-30 15:08:14.810981+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	2020-05-30 15:07:49.157+00	2020-06-06 16:59:59.999+00	[{"date": "2020-05-31T23:59:59.999+07:00", "task": 3}, {"date": "2020-06-03T23:59:59.999+07:00", "task": 1}]	f
a1d5801e-d863-44de-9ab6-11eee83bdbf8	new SA 001 sondh	sondh-SA-test001 sondh-SA-test001	Something here	2020-06-02 09:24:24.73661+00	TextClassificationProject	f	f	8	f	2020-06-03 12:22:18.813367+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	\N	\N	[]	t
aed2f8d1-13c3-407e-930c-a52a93c39e42	ddd	ddd		2020-06-03 17:10:40.341242+00	SequenceLabelingProject	f	t	4	f	2020-06-03 17:10:40.341242+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	\N	\N	[]	f
9904b817-0fd7-45f8-87ad-610f0f6c06cb	sondh-newner	sondh-newner		2020-06-04 05:35:13.610374+00	SequenceLabelingProject	f	t	4	f	2020-06-04 05:35:13.610374+00	41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	\N	\N	[]	f
\.


--
-- Data for Name: role_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_types (key, value) FROM stdin;
project_admin	Admin
annotator	Annotator
annotation_approver	Approver
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, auth0_id, created_at, last_seen, name) FROM stdin;
545aea2f-8288-405b-b8b2-b78c2afbc804	google-oauth2|108271244867679812300	2020-04-19 20:52:05.977413+00	2020-05-29 16:43:48.497954+00	sonstephendo
63ef80f2-0993-4056-ab83-990dbefcef23	google-oauth2|101837542719581251433	2020-04-25 01:07:15.463938+00	2020-04-30 01:55:04.67667+00	nomorepai96
41f33bf1-5bc0-4bb6-8cbf-2f18fea3c877	google-oauth2|100271490225369186811	2020-04-20 05:23:03.414156+00	2020-06-06 17:24:20.271465+00	sondh0127
4dc14875-6719-47fd-bfcb-f87212ac2d64	google-oauth2|103717809395205676275	2020-04-20 22:01:41.291792+00	2020-05-24 09:26:13.422787+00	loveinarmy
\.


--
-- Name: remote_schemas_id_seq; Type: SEQUENCE SET; Schema: hdb_catalog; Owner: postgres
--

SELECT pg_catalog.setval('hdb_catalog.remote_schemas_id_seq', 1, false);


--
-- Name: event_invocation_logs event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_invocation_logs
    ADD CONSTRAINT event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: event_log event_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_log
    ADD CONSTRAINT event_log_pkey PRIMARY KEY (id);


--
-- Name: event_triggers event_triggers_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_triggers
    ADD CONSTRAINT event_triggers_pkey PRIMARY KEY (name);


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_action_permission hdb_action_permission_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_permission
    ADD CONSTRAINT hdb_action_permission_pkey PRIMARY KEY (action_name, role_name);


--
-- Name: hdb_action hdb_action_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action
    ADD CONSTRAINT hdb_action_pkey PRIMARY KEY (action_name);


--
-- Name: hdb_allowlist hdb_allowlist_collection_name_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_allowlist
    ADD CONSTRAINT hdb_allowlist_collection_name_key UNIQUE (collection_name);


--
-- Name: hdb_computed_field hdb_computed_field_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_computed_field
    ADD CONSTRAINT hdb_computed_field_pkey PRIMARY KEY (table_schema, table_name, computed_field_name);


--
-- Name: hdb_function hdb_function_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_function
    ADD CONSTRAINT hdb_function_pkey PRIMARY KEY (function_schema, function_name);


--
-- Name: hdb_permission hdb_permission_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_permission
    ADD CONSTRAINT hdb_permission_pkey PRIMARY KEY (table_schema, table_name, role_name, perm_type);


--
-- Name: hdb_query_collection hdb_query_collection_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_query_collection
    ADD CONSTRAINT hdb_query_collection_pkey PRIMARY KEY (collection_name);


--
-- Name: hdb_relationship hdb_relationship_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_relationship
    ADD CONSTRAINT hdb_relationship_pkey PRIMARY KEY (table_schema, table_name, rel_name);


--
-- Name: hdb_table hdb_table_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_table
    ADD CONSTRAINT hdb_table_pkey PRIMARY KEY (table_schema, table_name);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: migration_settings migration_settings_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.migration_settings
    ADD CONSTRAINT migration_settings_pkey PRIMARY KEY (setting);


--
-- Name: remote_schemas remote_schemas_name_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas
    ADD CONSTRAINT remote_schemas_name_key UNIQUE (name);


--
-- Name: remote_schemas remote_schemas_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.remote_schemas
    ADD CONSTRAINT remote_schemas_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: annotations annotations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);


--
-- Name: labels labels_project_id_color_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_color_key UNIQUE (project_id, color);


--
-- Name: labels labels_project_id_hotkey_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_hotkey_key UNIQUE (project_id, hotkey);


--
-- Name: labels labels_project_id_text_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_text_key UNIQUE (project_id, text);


--
-- Name: notification_types notification_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT notification_types_pkey PRIMARY KEY (key);


--
-- Name: notification_types notification_types_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT notification_types_value_key UNIQUE (value);


--
-- Name: project_notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: project_contributors project_contributors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_pkey PRIMARY KEY (id);


--
-- Name: project_types project_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_types
    ADD CONSTRAINT project_types_pkey PRIMARY KEY (key);


--
-- Name: project_types project_types_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_types
    ADD CONSTRAINT project_types_value_key UNIQUE (value);


--
-- Name: projects projects_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_name_key UNIQUE (name);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: role_types roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_types
    ADD CONSTRAINT roles_pkey PRIMARY KEY (key);


--
-- Name: role_types roles_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_types
    ADD CONSTRAINT roles_value_key UNIQUE (value);


--
-- Name: users user_auth0_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_auth0_id_key UNIQUE (auth0_id);


--
-- Name: users user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id_key UNIQUE (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: event_invocation_logs_event_id_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_invocation_logs_event_id_idx ON hdb_catalog.event_invocation_logs USING btree (event_id);


--
-- Name: event_log_created_at_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_created_at_idx ON hdb_catalog.event_log USING btree (created_at);


--
-- Name: event_log_delivered_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_delivered_idx ON hdb_catalog.event_log USING btree (delivered);


--
-- Name: event_log_locked_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_locked_idx ON hdb_catalog.event_log USING btree (locked);


--
-- Name: event_log_trigger_name_idx; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX event_log_trigger_name_idx ON hdb_catalog.event_log USING btree (trigger_name);


--
-- Name: hdb_schema_update_event_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_schema_update_event_one_row ON hdb_catalog.hdb_schema_update_event USING btree (((occurred_at IS NOT NULL)));


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: hdb_schema_update_event hdb_schema_update_event_notifier; Type: TRIGGER; Schema: hdb_catalog; Owner: postgres
--

CREATE TRIGGER hdb_schema_update_event_notifier AFTER INSERT OR UPDATE ON hdb_catalog.hdb_schema_update_event FOR EACH ROW EXECUTE PROCEDURE hdb_catalog.hdb_schema_update_event_notifier();


--
-- Name: project_notifications check_insert_notifications_one; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_insert_notifications_one BEFORE INSERT ON public.project_notifications FOR EACH ROW EXECUTE PROCEDURE public.check_contributor_request();


--
-- Name: projects set_public_projects_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_projects_updated_at ON projects; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_projects_updated_at ON public.projects IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: event_invocation_logs event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_invocation_logs
    ADD CONSTRAINT event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.event_log(id);


--
-- Name: event_triggers event_triggers_schema_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.event_triggers
    ADD CONSTRAINT event_triggers_schema_name_fkey FOREIGN KEY (schema_name, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_action_permission hdb_action_permission_action_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_permission
    ADD CONSTRAINT hdb_action_permission_action_name_fkey FOREIGN KEY (action_name) REFERENCES hdb_catalog.hdb_action(action_name) ON UPDATE CASCADE;


--
-- Name: hdb_allowlist hdb_allowlist_collection_name_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_allowlist
    ADD CONSTRAINT hdb_allowlist_collection_name_fkey FOREIGN KEY (collection_name) REFERENCES hdb_catalog.hdb_query_collection(collection_name);


--
-- Name: hdb_computed_field hdb_computed_field_table_schema_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_computed_field
    ADD CONSTRAINT hdb_computed_field_table_schema_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_permission hdb_permission_table_schema_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_permission
    ADD CONSTRAINT hdb_permission_table_schema_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: hdb_relationship hdb_relationship_table_schema_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_relationship
    ADD CONSTRAINT hdb_relationship_table_schema_fkey FOREIGN KEY (table_schema, table_name) REFERENCES hdb_catalog.hdb_table(table_schema, table_name) ON UPDATE CASCADE;


--
-- Name: annotations annotations_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: annotations annotations_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: annotations annotations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: documents documents_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: labels labels_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_notifications notifications_notification_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT notifications_notification_type_fkey FOREIGN KEY (notification_type) REFERENCES public.notification_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_contributors project_contributors_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_contributors project_contributors_role_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_role_type_fkey FOREIGN KEY (role_type) REFERENCES public.role_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_contributors project_contributors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_notifications project_notifications_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT project_notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_notifications project_notifications_target_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT project_notifications_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: projects projects_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: projects projects_project_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_type_fkey FOREIGN KEY (project_type) REFERENCES public.project_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

