/* eslint-disable @typescript-eslint/class-name-casing */
import { ApolloCache, NormalizedCacheObject, ApolloClient, StoreObject } from '@apollo/client';
import { TypePolicies } from '@apollo/client/cache/inmemory/policies';
import { Projects } from '../';
import { Query_RootProjectsArgs } from '../';

    export interface ApolloContext {
      cache: ApolloCache<NormalizedCacheObject>;
      client: ApolloClient<NormalizedCacheObject>;
      getCacheKey: (object: StoreObject) => string;
    }
    
    export interface RootResolver<TableResolverMap> {
      [table: string]: TableResolverMap;
    }
    

  // projects Resolver Types
  //------------------------------------------------

  /** 
   *  The projects Resolver types can be used as follows:
   * 
   *  export const ProjectsResolvers: RootResolver<ProjectsResolverMap> = {
   *    projects: {
   *      anyFieldName: (projects, args, context, info) => {
   *        return projects.anyFieldName;
   *      },
   *     },
   *  };
  */

  //------------------------------------------------
  

  export interface ProjectsResolverFn<TContext> {
    (projects: Partial<Projects>, args: Query_RootProjectsArgs, context: TContext, info: any): any;
  }

  export interface ProjectsResolverMap<TContext = ApolloContext> {
    [field: string]: ProjectsResolverFn<TContext>;
  }
  

    // projects Type Policy
    //------------------------------------------------
  

      export const ProjectsTypePoliciesConfig: TypePolicies = {
        Query: {
          fields: {
            projects_by_pk:{
              keyArgs: ["id"],
              read(existingData, { args, toReference }) {
                return existingData || toReference({ __typename: 'projects', id: args!.id });
              },
            }
          },
        },
      };
  