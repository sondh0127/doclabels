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
CREATE TABLE public.annotations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    document_id uuid NOT NULL,
    label_id uuid,
    manual boolean DEFAULT false NOT NULL,
    data jsonb NOT NULL,
    is_submit boolean DEFAULT false NOT NULL,
    user_id uuid NOT NULL
);
CREATE TABLE public.documents (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    project_id uuid NOT NULL,
    meta jsonb,
    created_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.labels (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    hotkey character varying NOT NULL,
    color character varying NOT NULL,
    project_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.notification_types (
    key text NOT NULL,
    value text NOT NULL
);
CREATE TABLE public.project_contributors (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    role_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid NOT NULL
);
CREATE TABLE public.project_notifications (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    notification_type text NOT NULL,
    addition_data jsonb NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    target_id uuid NOT NULL,
    sender_id uuid NOT NULL
);
CREATE TABLE public.project_types (
    key text NOT NULL,
    value text NOT NULL
);
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
    owner_id uuid NOT NULL
);
CREATE TABLE public.role_types (
    key text NOT NULL,
    value text NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    auth0_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now(),
    name text NOT NULL
);
ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_color_key UNIQUE (project_id, color);
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_hotkey_key UNIQUE (project_id, hotkey);
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_text_key UNIQUE (project_id, text);
ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT notification_types_pkey PRIMARY KEY (key);
ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT notification_types_value_key UNIQUE (value);
ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_types
    ADD CONSTRAINT project_types_pkey PRIMARY KEY (key);
ALTER TABLE ONLY public.project_types
    ADD CONSTRAINT project_types_value_key UNIQUE (value);
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_name_key UNIQUE (name);
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.role_types
    ADD CONSTRAINT roles_pkey PRIMARY KEY (key);
ALTER TABLE ONLY public.role_types
    ADD CONSTRAINT roles_value_key UNIQUE (value);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_auth0_id_key UNIQUE (auth0_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id_key UNIQUE (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER check_insert_notifications_one BEFORE INSERT ON public.project_notifications FOR EACH ROW EXECUTE PROCEDURE public.check_contributor_request();
CREATE TRIGGER set_public_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_projects_updated_at ON public.projects IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.annotations
    ADD CONSTRAINT annotations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT notifications_notification_type_fkey FOREIGN KEY (notification_type) REFERENCES public.notification_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_role_type_fkey FOREIGN KEY (role_type) REFERENCES public.role_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_contributors
    ADD CONSTRAINT project_contributors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT project_notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_notifications
    ADD CONSTRAINT project_notifications_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_type_fkey FOREIGN KEY (project_type) REFERENCES public.project_types(key) ON UPDATE RESTRICT ON DELETE RESTRICT;
