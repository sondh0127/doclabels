import { defaultCacheIdFromObject, generateOptimisticResponseForMutation, generateUpdateFunctionForMutation, convertToGraph, ObjectWithId, FieldMap, getLogLevel, ensureTypenameOnFragment, ensureTypenameOnFragments, stripInsertInputClientFields } from 'graphql-codegen-hasura-core'
import { ApolloClient, ApolloCache, ApolloQueryResult, FetchResult, MutationOptions, ObservableQuery, QueryOptions, SubscriptionOptions, Observable, DataProxy } from '@apollo/client'
import { ProjectFragment } from '../';
import { Projects } from '../';
import { ProjectFragmentDoc } from '../';
import { QueryProjectObjectsQueryVariables } from '../';
import { QueryProjectByIdQuery } from '../';
import { QueryProjectByIdDocument } from '../';
import { QueryProjectByIdQueryVariables } from '../';
import { QueryProjectObjectsQuery } from '../';
import { QueryProjectObjectsDocument } from '../';
import { SubscribeToProjectByIdSubscription } from '../';
import { SubscribeToProjectByIdDocument } from '../';
import { SubscribeToProjectByIdSubscriptionVariables } from '../';
import { SubscribeToProjectObjectsSubscription } from '../';
import { SubscribeToProjectObjectsDocument } from '../';
import { SubscribeToProjectObjectsSubscriptionVariables } from '../';
import { Projects_Insert_Input } from '../';
import { Projects_On_Conflict } from '../';
import { InsertProjectMutation } from '../';
import { InsertProjectWithOnConflictMutation } from '../';
import { InsertProjectMutationVariables } from '../';
import { InsertProjectWithOnConflictMutationVariables } from '../';
import { InsertProjectDocument } from '../';
import { InsertProjectWithOnConflictDocument } from '../';
import { Projects_Set_Input } from '../';
import { UpdateProjectByIdMutation } from '../';
import { UpdateProjectByIdMutationVariables } from '../';
import { UpdateProjectByIdDocument } from '../';
import { UpdateProjectMutation } from '../';
import { UpdateProjectMutationVariables } from '../';
import { UpdateProjectDocument } from '../';
import { RemoveProjectsModelMutation } from '../';
import { RemoveProjectsModelMutationVariables } from '../';
import { RemoveProjectsModelDocument } from '../';
import { RemoveProjectsModelByIdMutation } from '../';
import { RemoveProjectsModelByIdMutationVariables } from '../';
import { RemoveProjectsModelByIdDocument } from '../';
import { ProjectExploreFragment } from '../';
import { ProjectExploreFragmentDoc } from '../';
import { QueryProjectExploreObjectsQueryVariables } from '../';
import { QueryProjectExploreByIdQuery } from '../';
import { QueryProjectExploreByIdDocument } from '../';
import { QueryProjectExploreByIdQueryVariables } from '../';
import { QueryProjectExploreObjectsQuery } from '../';
import { QueryProjectExploreObjectsDocument } from '../';
import { SubscribeToProjectExploreByIdSubscription } from '../';
import { SubscribeToProjectExploreByIdDocument } from '../';
import { SubscribeToProjectExploreByIdSubscriptionVariables } from '../';
import { SubscribeToProjectExploreObjectsSubscription } from '../';
import { SubscribeToProjectExploreObjectsDocument } from '../';
import { SubscribeToProjectExploreObjectsSubscriptionVariables } from '../';
import { InsertProjectExploreMutation } from '../';
import { InsertProjectExploreWithOnConflictMutation } from '../';
import { InsertProjectExploreMutationVariables } from '../';
import { InsertProjectExploreWithOnConflictMutationVariables } from '../';
import { InsertProjectExploreDocument } from '../';
import { InsertProjectExploreWithOnConflictDocument } from '../';
import { UpdateProjectExploreByIdMutation } from '../';
import { UpdateProjectExploreByIdMutationVariables } from '../';
import { UpdateProjectExploreByIdDocument } from '../';
import { UpdateProjectExploreMutation } from '../';
import { UpdateProjectExploreMutationVariables } from '../';
import { UpdateProjectExploreDocument } from '../';

    // GLOBAL TYPES
    //------------------------------------------------
    export type RemoveEntitiesQueryHelperResultEx = { affected_rows:number };

    //
    // GLOBAL VALUES
    const logLevel = getLogLevel();

  

    // projects HELPERS
    //------------------------------------------------

    export type ProjectByIdHelperResultEx = { project:ProjectFragment | null | undefined };
    export type ProjectObjectsHelperResultEx = { objects:ProjectFragment[] };
    
  

    // Direct Client & Cache Fragment Helpers
    //
    function cacheGetDataIdForProject( projectsId: string): string {
      return defaultCacheIdFromObject({ __typename: 'projects', id:projectsId });
    }

    function cacheReadFragmentProjectById({ apolloCache, projectsId}: { apolloCache: ApolloCache<object>, projectsId: string }): ProjectFragment | null | undefined {
      return apolloCache.readFragment<ProjectFragment | null | undefined>({ fragment: ProjectFragmentDoc, fragmentName:'Project', id: defaultCacheIdFromObject({ __typename: 'projects', id:projectsId }) });
    }

    function cacheWriteFragmentProjectById({ apolloCache, projectsId, projectPartial, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, projectsId: string, projectPartial: Partial<ProjectFragment> | Projects_Insert_Input | null, fieldMap?: FieldMap, apolloBroadcast?:boolean }): Partial<ProjectFragment> {
      const parsedFragment = convertToGraph({ input:projectPartial, typename:'projects', fieldMap });
      if(logLevel >= 2) console.log(' --> cacheWriteFragmentProjectById - parsedFragment:', parsedFragment);
      apolloCache.writeFragment<Partial<ProjectFragment> | null>({ fragment: ProjectFragmentDoc, fragmentName:'Project', id: defaultCacheIdFromObject({ ...parsedFragment, id:projectsId }), data: parsedFragment, broadcast:apolloBroadcast });
      return parsedFragment;
    }

    function cacheReadQueryProjectById({ apolloCache, projectsId}: { apolloCache: ApolloCache<object>, projectsId: string }): ProjectFragment | null | undefined {
      try {
        return apolloCache.readQuery<ProjectFragment | null >({ query: QueryProjectByIdDocument, variables: { projectsId }  });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheReadQueryProjectById threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectById({ apolloCache, projectsId, project, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, projectsId: string, project: ProjectFragment | Projects_Insert_Input | null, fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      try {
        const projectPartial = convertToGraph({ input:project, typename:'projects', fieldMap });
        return apolloCache.writeQuery<ProjectFragment | null>({ query: QueryProjectByIdDocument, variables: { projectsId }, data: (project ? projectPartial : null), broadcast:apolloBroadcast });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheWriteQueryProjectById threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }
    
    function cacheReadQueryProjectObjects({ apolloCache, variables }: { apolloCache: ApolloCache<object>, variables: QueryProjectObjectsQueryVariables }): Projects[] | null | undefined {
      try {
        return apolloCache.readQuery<{Projects:Projects[] | null}>({ query: QueryProjectObjectsDocument, variables })?.Projects || [];
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheReadQueryProjectObjects threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectObjects({ apolloCache, variables, data, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectObjectsQueryVariables, data:(Projects | Projects_Insert_Input)[], fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      try {   
        const objects = convertToGraph({ input:data, typename:'projects', fieldMap });
        return apolloCache.writeQuery<{Projects:Projects[]}>({ query: QueryProjectObjectsDocument, variables, data: { Projects:objects }, broadcast:apolloBroadcast });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheWriteQueryProjectObjects threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectInsert({ apolloCache, variables, projects, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectObjectsQueryVariables, projects:Projects_Insert_Input, fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      const currentObjects = cacheReadQueryProjectObjects({ apolloCache, variables }) || [];
      const objectsWithInserted = [ ...currentObjects, convertToGraph({ input: projects, typename:'projects', fieldMap })];
      if(logLevel >= 2) console.log(' --> cacheWriteQueryProjectInsert - objectsWithInserted:', objectsWithInserted);
      return cacheWriteQueryProjectObjects({ apolloCache, variables, data: objectsWithInserted, apolloBroadcast });
    }

    function cacheWriteQueryProjectRemove({ apolloCache, variables, projectsId, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectObjectsQueryVariables, projectsId: string, apolloBroadcast?:boolean }): void {
      const currentObjects = cacheReadQueryProjectObjects({ apolloCache, variables }) || [];
      const objectsWithRemoved = currentObjects.filter(objectItem => objectItem.id !== projectsId) || [];
      if(logLevel >= 2) console.log(' --> cacheWriteQueryProjectRemove - objectsWithRemoved:', objectsWithRemoved);
      return cacheWriteQueryProjectObjects({ apolloCache, variables, data: objectsWithRemoved, apolloBroadcast });
    };
    

      // Query Fetch Helper
      //
      export type QueryProjectByIdApolloQueryResult = ApolloQueryResult<QueryProjectByIdQuery>;
      export type QueryProjectByIdApolloQueryHelperResultEx = QueryProjectByIdApolloQueryResult & ProjectByIdHelperResultEx;

      async function queryProjectById({ apolloClient, projectsId, options }: { apolloClient: ApolloClient<object>, projectsId: string, options?: Omit<QueryOptions<QueryProjectByIdQueryVariables>, 'query' | 'variables'> }): Promise<QueryProjectByIdApolloQueryHelperResultEx> {
        const query: QueryProjectByIdApolloQueryResult = await apolloClient.query<QueryProjectByIdQuery>({ query: QueryProjectByIdDocument, variables: { projectsId }, ...options });
        
        return { ...query, project: query?.data?.projects_by_pk }
      }

      // Query Watch ById Helper
      //
      export type WatchQueryProjectByIdApolloObservableQuery = ObservableQuery<QueryProjectByIdQuery>;
      async function watchQueryProjectById({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectByIdQueryVariables>, 'query'> }) : Promise<WatchQueryProjectByIdApolloObservableQuery> {
        return apolloClient.watchQuery<QueryProjectByIdQuery>({ query: QueryProjectByIdDocument, ...options });
      }
    

      // Query Fetch Objects Helper
      //
      export type QueryProjectObjectsObjectsApolloQueryResult = ApolloQueryResult<QueryProjectObjectsQuery>;
      export type QueryProjectObjectsObjectsApolloQueryResultEx = QueryProjectObjectsObjectsApolloQueryResult & ProjectObjectsHelperResultEx;

      async function queryProjectObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectObjectsQueryVariables>, 'query'> }): Promise<QueryProjectObjectsObjectsApolloQueryResultEx> {
        const query: QueryProjectObjectsObjectsApolloQueryResult = await apolloClient.query<QueryProjectObjectsQuery>({ query: QueryProjectObjectsDocument, ...options });
        
        return { ...query, objects: query?.data?.projects || [] }
      }

      // Query Watch Objects Helper
      //
      export type WatchQueryProjectObjectsApolloObservableQuery = ObservableQuery<QueryProjectObjectsQuery>;
      async function watchQueryProjectObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectObjectsQueryVariables>, 'query'> }) : Promise<WatchQueryProjectObjectsApolloObservableQuery> {
        return apolloClient.watchQuery<QueryProjectObjectsQuery>({ query: QueryProjectObjectsDocument, ...options });
      }
    

    // Subscription Fetch ById Helper
    //
    export type SubscribeToProjectByIdSubscriptionFetchResult = FetchResult<SubscribeToProjectByIdSubscription, Record<string, any>, Record<string, any>>;
    export type SubscribeToProjectByIdSubscriptionFetchResultEx = FetchResult<SubscribeToProjectByIdSubscription, Record<string, any>, Record<string, any>> & ProjectByIdHelperResultEx;
    
    async function subscribeToProjectById({ apolloClient, projectsId, options }: { apolloClient: ApolloClient<object>, projectsId:string, options?: Omit<SubscriptionOptions<SubscribeToProjectByIdSubscriptionVariables>, 'query' | 'variables'> }): Promise<Observable<SubscribeToProjectByIdSubscriptionFetchResultEx>> {
      const subscription:Observable<SubscribeToProjectByIdSubscriptionFetchResult> = apolloClient.subscribe<SubscribeToProjectByIdSubscription>({ query: SubscribeToProjectByIdDocument, variables: { projectsId }, ...options });
      
      return subscription.map(value => {return { context:value.context, errors:value.errors, data:value.data, extensions:value.extensions, project:value?.data?.projects_by_pk || [] }  as SubscribeToProjectByIdSubscriptionFetchResultEx }) ;
    }
    

      // Subscription Fetch Objects Helper
      //
      export type SubscribeToProjectObjectsSubscriptionFetchResult = FetchResult<SubscribeToProjectObjectsSubscription, Record<string, any>, Record<string, any>>;
      export type SubscribeToProjectObjectsSubscriptionFetchResultEx = FetchResult<SubscribeToProjectObjectsSubscription, Record<string, any>, Record<string, any>> & ProjectObjectsHelperResultEx;

      async function subscribeToProjectObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options?: Omit<SubscriptionOptions<SubscribeToProjectObjectsSubscriptionVariables>, 'query'> }): Promise<Observable<SubscribeToProjectObjectsSubscriptionFetchResultEx>> {
        const subscription:Observable<SubscribeToProjectObjectsSubscriptionFetchResult> = apolloClient.subscribe<SubscribeToProjectObjectsSubscription>({ query: SubscribeToProjectObjectsDocument, ...options });
        
        return subscription.map(value => {return { context:value.context, errors:value.errors, data:value.data, extensions:value.extensions, objects: value?.data?.projects || [] }  as SubscribeToProjectObjectsSubscriptionFetchResultEx }) ;
      }
    

    // Insert Helper
    //
    type InsertProjectFetchResult = FetchResult<InsertProjectMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectFetchHelperResultEx = InsertProjectFetchResult & ProjectByIdHelperResultEx;

    async function insertProject({ apolloClient, projects, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, projects: Projects_Insert_Input, autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectMutation, InsertProjectMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectFetchHelperResultEx> {
      const objectForInsert = stripInsertInputClientFields({ input: projects });
      const mutationOptions:MutationOptions<InsertProjectMutation, InsertProjectMutationVariables> = { mutation: InsertProjectDocument, variables: { objects: [objectForInsert] }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProject - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation:InsertProjectFetchResult = await apolloClient.mutate<InsertProjectMutation, InsertProjectMutationVariables>(mutationOptions);
        
      return { ...mutation, project: mutation?.data?.insert_projects?.returning && mutation.data.insert_projects.returning[0] };
    }

    async function insertProjectWithOnConflict({ apolloClient, projects, onConflict, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, projects: Projects_Insert_Input, onConflict: Projects_On_Conflict, autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectFetchHelperResultEx> {
      const objectForInsert = stripInsertInputClientFields({ input: projects });
      const mutationOptions:MutationOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables> = { mutation: InsertProjectWithOnConflictDocument, variables: { objects: [objectForInsert], onConflict }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectWithOnConflictMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProjectWithOnConflict - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation:InsertProjectFetchResult = await apolloClient.mutate<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>(mutationOptions);
        
      return { ...mutation, project: mutation?.data?.insert_projects?.returning && mutation.data.insert_projects.returning[0] };
    }



  

    // Insert Objects Helper
    //
    type InsertProjectObjectsFetchResult = FetchResult<InsertProjectMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectObjectsHelperResultEx = InsertProjectObjectsFetchResult & ProjectObjectsHelperResultEx;

    async function insertProjectObjects({ apolloClient, objects, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, objects: Projects_Insert_Input[], autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectMutation, InsertProjectMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectObjectsHelperResultEx> {
      const objectsForInsert = objects.map(objectItem => stripInsertInputClientFields({ input: objectItem }));
      const mutationOptions:MutationOptions<InsertProjectMutation, InsertProjectMutationVariables> = { mutation: InsertProjectDocument, variables: { objects: objectsForInsert }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(objectsForInsert.find(objectItem => !objectItem.id)) throw new Error(`if autoOptimisticResponse = true, ids must be set in objects`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectMutation>({ operationType: 'insert', entityName:'projects', objects:objectsForInsert as (Projects_Insert_Input & ObjectWithId)[], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProject - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation: InsertProjectObjectsFetchResult = await apolloClient.mutate<InsertProjectMutation, InsertProjectMutationVariables>(mutationOptions);
        
      return { ...mutation, objects: mutation?.data?.insert_projects?.returning || [] };
    }
  

    // Update Helper
    //
    type UpdateProjectByIdQueryResult = FetchResult<UpdateProjectByIdMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectByIdHelperResultEx = UpdateProjectByIdQueryResult & ProjectByIdHelperResultEx;

    async function updateProjectById({ apolloClient, projectsId, set, autoOptimisticResponse, options }: { apolloClient: ApolloClient<object>, projectsId: string, set: Projects_Set_Input, autoOptimisticResponse?:boolean, options?: Omit<MutationOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>, 'mutation'> }): Promise<UpdateProjectByIdHelperResultEx> {
      const mutationOptions:MutationOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables> = { mutation: UpdateProjectByIdDocument, variables: { id:projectsId, set }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<UpdateProjectByIdMutation>({ operationType: 'update', entityName:'projects', objects:[{ id:projectsId, ...set }] }); 
        if(logLevel >= 2) console.log(' --> updateProjectById - optimisticResponse:', mutationOptions.optimisticResponse);
      }

      const mutation:UpdateProjectByIdQueryResult = await apolloClient.mutate<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>(mutationOptions);
        
      return { ...mutation, project: mutation?.data?.update_projects?.returning && mutation.data.update_projects.returning[0] };
    }
  

    // Update Objects Helper
    //
    type UpdateProjectObjectsFetchResult = FetchResult<UpdateProjectMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectObjectsHelperResultEx = UpdateProjectObjectsFetchResult & ProjectObjectsHelperResultEx;

    async function updateProjectObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<MutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>, 'mutation'> }): Promise<UpdateProjectObjectsHelperResultEx> {  
      const mutation:UpdateProjectObjectsFetchResult = await apolloClient.mutate<UpdateProjectMutation, UpdateProjectMutationVariables>({ mutation: UpdateProjectDocument, ...options } );
        
      return { ...mutation, objects:mutation?.data?.update_projects?.returning || [] };
    }
  
  

    // Delete Helper
    //

    type RemoveProjectsModelByIdQueryResult = FetchResult<RemoveProjectsModelByIdMutation, Record<string, any>, Record<string, any>>;
    export type RemoveProjectsModelByIdQueryHelperResultEx = RemoveProjectsModelByIdQueryResult & RemoveEntitiesQueryHelperResultEx;
  
    async function removeProjectsModelById({ apolloClient, projectsId, autoOptimisticResponse, options } :{ apolloClient: ApolloClient<object>, projectsId: string, autoOptimisticResponse?:boolean, options?: Omit<MutationOptions<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>, 'mutation'> }): Promise<RemoveProjectsModelByIdQueryHelperResultEx> {
      const mutationOptions:MutationOptions<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables> = { mutation: RemoveProjectsModelByIdDocument, variables: { id:projectsId, }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<RemoveProjectsModelByIdMutation>({ operationType: 'delete', entityName:'projects', objects:[{ id:projectsId }] }); 
        if(logLevel >= 2) console.log(' --> removeProjectsModelById - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      if((!options || !options.update)){ mutationOptions.update = generateUpdateFunctionForMutation<RemoveProjectsModelByIdMutation>({ operationType: 'delete', entityName:'projects', entityId:projectsId }); }
      
      const mutation:RemoveProjectsModelByIdQueryResult = await apolloClient.mutate<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>(mutationOptions);
    
      return { ...mutation, affected_rows: mutation?.data?.delete_projects?.affected_rows || 0 };
    }
  

    type RemoveProjectsModelObjectsQueryResult = FetchResult<RemoveProjectsModelMutation, Record<string, any>, Record<string, any>>;
    export type RemoveProjectsModelObjectsQueryHelperResultEx = RemoveProjectsModelObjectsQueryResult & RemoveEntitiesQueryHelperResultEx;  
  
    async function removeProjectsModelObjects({ apolloClient, options }:{ apolloClient: ApolloClient<object>, options: Omit<MutationOptions<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>, 'mutation'> }): Promise<RemoveProjectsModelObjectsQueryHelperResultEx> {  
        const mutation:RemoveProjectsModelObjectsQueryResult = await apolloClient.mutate<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>({ mutation: RemoveProjectsModelDocument, ...options } );
          
        return { ...mutation, affected_rows: mutation?.data?.delete_projects?.affected_rows || 0 };
      }
  

    // Project Fragment Helper Object
    //------------------------------------------------

    export const ProjectFragmentGQLHelper = {
      cacheGetDataId: cacheGetDataIdForProject,
      cacheReadFragmentById: cacheReadFragmentProjectById,
      cacheWriteFragmentById: cacheWriteFragmentProjectById,
      cacheReadQueryById: cacheReadQueryProjectById,
      cacheWriteQueryById: cacheWriteQueryProjectById,
      cacheReadQueryObjects: cacheReadQueryProjectObjects,
      cacheWriteQueryObjects: cacheWriteQueryProjectObjects,
      cacheWriteQueryInsert: cacheWriteQueryProjectInsert,
      cacheWriteQueryRemove: cacheWriteQueryProjectRemove,
      queryById: queryProjectById,
      queryObjects: queryProjectObjects,
      watchQueryById: watchQueryProjectById,
      watchQueryObjects: watchQueryProjectObjects,
      subscribeToById: subscribeToProjectById,
      subscribeToObjects: subscribeToProjectObjects,
      insert: insertProject,
      insertWithOnConflict: insertProjectWithOnConflict,
      insertObjects: insertProjectObjects,
      updateById: updateProjectById,
      updateObjects: updateProjectObjects
    }
  

    // projects Entity Helper Object
    //------------------------------------------------

    export const ProjectsModelGQLHelper = {
      removeById: removeProjectsModelById,
      removeObjects: removeProjectsModelObjects
    }
  

    // projects HELPERS
    //------------------------------------------------

    export type ProjectExploreByIdHelperResultEx = { projectExplore:ProjectExploreFragment | null | undefined };
    export type ProjectExploreObjectsHelperResultEx = { objects:ProjectExploreFragment[] };
    
  

    // Direct Client & Cache Fragment Helpers
    //
    function cacheGetDataIdForProjectExplore( projectsId: string): string {
      return defaultCacheIdFromObject({ __typename: 'projects', id:projectsId });
    }

    function cacheReadFragmentProjectExploreById({ apolloCache, projectsId}: { apolloCache: ApolloCache<object>, projectsId: string }): ProjectExploreFragment | null | undefined {
      return apolloCache.readFragment<ProjectExploreFragment | null | undefined>({ fragment: ProjectExploreFragmentDoc, fragmentName:'ProjectExplore', id: defaultCacheIdFromObject({ __typename: 'projects', id:projectsId }) });
    }

    function cacheWriteFragmentProjectExploreById({ apolloCache, projectsId, projectExplorePartial, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, projectsId: string, projectExplorePartial: Partial<ProjectExploreFragment> | Projects_Insert_Input | null, fieldMap?: FieldMap, apolloBroadcast?:boolean }): Partial<ProjectExploreFragment> {
      const parsedFragment = convertToGraph({ input:projectExplorePartial, typename:'projects', fieldMap });
      if(logLevel >= 2) console.log(' --> cacheWriteFragmentProjectExploreById - parsedFragment:', parsedFragment);
      apolloCache.writeFragment<Partial<ProjectExploreFragment> | null>({ fragment: ProjectExploreFragmentDoc, fragmentName:'ProjectExplore', id: defaultCacheIdFromObject({ ...parsedFragment, id:projectsId }), data: parsedFragment, broadcast:apolloBroadcast });
      return parsedFragment;
    }

    function cacheReadQueryProjectExploreById({ apolloCache, projectsId}: { apolloCache: ApolloCache<object>, projectsId: string }): ProjectExploreFragment | null | undefined {
      try {
        return apolloCache.readQuery<ProjectExploreFragment | null >({ query: QueryProjectExploreByIdDocument, variables: { projectsId }  });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheReadQueryProjectExploreById threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectExploreById({ apolloCache, projectsId, projectExplore, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, projectsId: string, projectExplore: ProjectExploreFragment | Projects_Insert_Input | null, fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      try {
        const projectExplorePartial = convertToGraph({ input:projectExplore, typename:'projects', fieldMap });
        return apolloCache.writeQuery<ProjectExploreFragment | null>({ query: QueryProjectExploreByIdDocument, variables: { projectsId }, data: (projectExplore ? projectExplorePartial : null), broadcast:apolloBroadcast });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheWriteQueryProjectExploreById threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }
    
    function cacheReadQueryProjectExploreObjects({ apolloCache, variables }: { apolloCache: ApolloCache<object>, variables: QueryProjectExploreObjectsQueryVariables }): Projects[] | null | undefined {
      try {
        return apolloCache.readQuery<{Projects:Projects[] | null}>({ query: QueryProjectExploreObjectsDocument, variables })?.Projects || [];
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheReadQueryProjectExploreObjects threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectExploreObjects({ apolloCache, variables, data, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectExploreObjectsQueryVariables, data:(Projects | Projects_Insert_Input)[], fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      try {   
        const objects = convertToGraph({ input:data, typename:'projects', fieldMap });
        return apolloCache.writeQuery<{Projects:Projects[]}>({ query: QueryProjectExploreObjectsDocument, variables, data: { Projects:objects }, broadcast:apolloBroadcast });
      } catch (error) {
        //DEVNOTE: Remove after this apollographql issue has been addressed: https://github.com/apollographql/apollo-client/issues/6094
        console.warn('cacheWriteQueryProjectExploreObjects threw error. Could be related to this apolloGraphQl Issue. If so, can ignore: https://github.com/apollographql/apollo-client/issues/6094');
      }
      return undefined;
    }

    function cacheWriteQueryProjectExploreInsert({ apolloCache, variables, projects, fieldMap, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectExploreObjectsQueryVariables, projects:Projects_Insert_Input, fieldMap?: FieldMap, apolloBroadcast?:boolean }): void {
      const currentObjects = cacheReadQueryProjectExploreObjects({ apolloCache, variables }) || [];
      const objectsWithInserted = [ ...currentObjects, convertToGraph({ input: projects, typename:'projects', fieldMap })];
      if(logLevel >= 2) console.log(' --> cacheWriteQueryProjectExploreInsert - objectsWithInserted:', objectsWithInserted);
      return cacheWriteQueryProjectExploreObjects({ apolloCache, variables, data: objectsWithInserted, apolloBroadcast });
    }

    function cacheWriteQueryProjectExploreRemove({ apolloCache, variables, projectsId, apolloBroadcast }: { apolloCache: ApolloCache<object>, variables: QueryProjectExploreObjectsQueryVariables, projectsId: string, apolloBroadcast?:boolean }): void {
      const currentObjects = cacheReadQueryProjectExploreObjects({ apolloCache, variables }) || [];
      const objectsWithRemoved = currentObjects.filter(objectItem => objectItem.id !== projectsId) || [];
      if(logLevel >= 2) console.log(' --> cacheWriteQueryProjectExploreRemove - objectsWithRemoved:', objectsWithRemoved);
      return cacheWriteQueryProjectExploreObjects({ apolloCache, variables, data: objectsWithRemoved, apolloBroadcast });
    };
    

      // Query Fetch Helper
      //
      export type QueryProjectExploreByIdApolloQueryResult = ApolloQueryResult<QueryProjectExploreByIdQuery>;
      export type QueryProjectExploreByIdApolloQueryHelperResultEx = QueryProjectExploreByIdApolloQueryResult & ProjectExploreByIdHelperResultEx;

      async function queryProjectExploreById({ apolloClient, projectsId, options }: { apolloClient: ApolloClient<object>, projectsId: string, options?: Omit<QueryOptions<QueryProjectExploreByIdQueryVariables>, 'query' | 'variables'> }): Promise<QueryProjectExploreByIdApolloQueryHelperResultEx> {
        const query: QueryProjectExploreByIdApolloQueryResult = await apolloClient.query<QueryProjectExploreByIdQuery>({ query: QueryProjectExploreByIdDocument, variables: { projectsId }, ...options });
        
        return { ...query, projectExplore: query?.data?.projects_by_pk }
      }

      // Query Watch ById Helper
      //
      export type WatchQueryProjectExploreByIdApolloObservableQuery = ObservableQuery<QueryProjectExploreByIdQuery>;
      async function watchQueryProjectExploreById({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectExploreByIdQueryVariables>, 'query'> }) : Promise<WatchQueryProjectExploreByIdApolloObservableQuery> {
        return apolloClient.watchQuery<QueryProjectExploreByIdQuery>({ query: QueryProjectExploreByIdDocument, ...options });
      }
    

      // Query Fetch Objects Helper
      //
      export type QueryProjectExploreObjectsObjectsApolloQueryResult = ApolloQueryResult<QueryProjectExploreObjectsQuery>;
      export type QueryProjectExploreObjectsObjectsApolloQueryResultEx = QueryProjectExploreObjectsObjectsApolloQueryResult & ProjectExploreObjectsHelperResultEx;

      async function queryProjectExploreObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectExploreObjectsQueryVariables>, 'query'> }): Promise<QueryProjectExploreObjectsObjectsApolloQueryResultEx> {
        const query: QueryProjectExploreObjectsObjectsApolloQueryResult = await apolloClient.query<QueryProjectExploreObjectsQuery>({ query: QueryProjectExploreObjectsDocument, ...options });
        
        return { ...query, objects: query?.data?.projects || [] }
      }

      // Query Watch Objects Helper
      //
      export type WatchQueryProjectExploreObjectsApolloObservableQuery = ObservableQuery<QueryProjectExploreObjectsQuery>;
      async function watchQueryProjectExploreObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<QueryOptions<QueryProjectExploreObjectsQueryVariables>, 'query'> }) : Promise<WatchQueryProjectExploreObjectsApolloObservableQuery> {
        return apolloClient.watchQuery<QueryProjectExploreObjectsQuery>({ query: QueryProjectExploreObjectsDocument, ...options });
      }
    

    // Subscription Fetch ById Helper
    //
    export type SubscribeToProjectExploreByIdSubscriptionFetchResult = FetchResult<SubscribeToProjectExploreByIdSubscription, Record<string, any>, Record<string, any>>;
    export type SubscribeToProjectExploreByIdSubscriptionFetchResultEx = FetchResult<SubscribeToProjectExploreByIdSubscription, Record<string, any>, Record<string, any>> & ProjectExploreByIdHelperResultEx;
    
    async function subscribeToProjectExploreById({ apolloClient, projectsId, options }: { apolloClient: ApolloClient<object>, projectsId:string, options?: Omit<SubscriptionOptions<SubscribeToProjectExploreByIdSubscriptionVariables>, 'query' | 'variables'> }): Promise<Observable<SubscribeToProjectExploreByIdSubscriptionFetchResultEx>> {
      const subscription:Observable<SubscribeToProjectExploreByIdSubscriptionFetchResult> = apolloClient.subscribe<SubscribeToProjectExploreByIdSubscription>({ query: SubscribeToProjectExploreByIdDocument, variables: { projectsId }, ...options });
      
      return subscription.map(value => {return { context:value.context, errors:value.errors, data:value.data, extensions:value.extensions, projectExplore:value?.data?.projects_by_pk || [] }  as SubscribeToProjectExploreByIdSubscriptionFetchResultEx }) ;
    }
    

      // Subscription Fetch Objects Helper
      //
      export type SubscribeToProjectExploreObjectsSubscriptionFetchResult = FetchResult<SubscribeToProjectExploreObjectsSubscription, Record<string, any>, Record<string, any>>;
      export type SubscribeToProjectExploreObjectsSubscriptionFetchResultEx = FetchResult<SubscribeToProjectExploreObjectsSubscription, Record<string, any>, Record<string, any>> & ProjectExploreObjectsHelperResultEx;

      async function subscribeToProjectExploreObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options?: Omit<SubscriptionOptions<SubscribeToProjectExploreObjectsSubscriptionVariables>, 'query'> }): Promise<Observable<SubscribeToProjectExploreObjectsSubscriptionFetchResultEx>> {
        const subscription:Observable<SubscribeToProjectExploreObjectsSubscriptionFetchResult> = apolloClient.subscribe<SubscribeToProjectExploreObjectsSubscription>({ query: SubscribeToProjectExploreObjectsDocument, ...options });
        
        return subscription.map(value => {return { context:value.context, errors:value.errors, data:value.data, extensions:value.extensions, objects: value?.data?.projects || [] }  as SubscribeToProjectExploreObjectsSubscriptionFetchResultEx }) ;
      }
    

    // Insert Helper
    //
    type InsertProjectExploreFetchResult = FetchResult<InsertProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectExploreFetchHelperResultEx = InsertProjectExploreFetchResult & ProjectExploreByIdHelperResultEx;

    async function insertProjectExplore({ apolloClient, projects, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, projects: Projects_Insert_Input, autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectExploreFetchHelperResultEx> {
      const objectForInsert = stripInsertInputClientFields({ input: projects });
      const mutationOptions:MutationOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables> = { mutation: InsertProjectExploreDocument, variables: { objects: [objectForInsert] }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectExploreMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProjectExplore - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation:InsertProjectExploreFetchResult = await apolloClient.mutate<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>(mutationOptions);
        
      return { ...mutation, projectExplore: mutation?.data?.insert_projects?.returning && mutation.data.insert_projects.returning[0] };
    }

    async function insertProjectExploreWithOnConflict({ apolloClient, projects, onConflict, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, projects: Projects_Insert_Input, onConflict: Projects_On_Conflict, autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectExploreFetchHelperResultEx> {
      const objectForInsert = stripInsertInputClientFields({ input: projects });
      const mutationOptions:MutationOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables> = { mutation: InsertProjectExploreWithOnConflictDocument, variables: { objects: [objectForInsert], onConflict }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectExploreWithOnConflictMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProjectExploreWithOnConflict - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation:InsertProjectExploreFetchResult = await apolloClient.mutate<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>(mutationOptions);
        
      return { ...mutation, projectExplore: mutation?.data?.insert_projects?.returning && mutation.data.insert_projects.returning[0] };
    }



  

    // Insert Objects Helper
    //
    type InsertProjectExploreObjectsFetchResult = FetchResult<InsertProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectExploreObjectsHelperResultEx = InsertProjectExploreObjectsFetchResult & ProjectExploreObjectsHelperResultEx;

    async function insertProjectExploreObjects({ apolloClient, objects, autoOptimisticResponse, fieldMap, options } :{ apolloClient: ApolloClient<object>, objects: Projects_Insert_Input[], autoOptimisticResponse?:boolean, fieldMap?: FieldMap, options?: Omit<MutationOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>, 'mutation' | 'variables'> }): Promise<InsertProjectExploreObjectsHelperResultEx> {
      const objectsForInsert = objects.map(objectItem => stripInsertInputClientFields({ input: objectItem }));
      const mutationOptions:MutationOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables> = { mutation: InsertProjectExploreDocument, variables: { objects: objectsForInsert }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        if(objectsForInsert.find(objectItem => !objectItem.id)) throw new Error(`if autoOptimisticResponse = true, ids must be set in objects`); 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectExploreMutation>({ operationType: 'insert', entityName:'projects', objects:objectsForInsert as (Projects_Insert_Input & ObjectWithId)[], fieldMap }); 
        if(logLevel >= 2) console.log(' --> insertProjectExplore - optimisticResponse:', mutationOptions.optimisticResponse);
      }
      
      const mutation: InsertProjectExploreObjectsFetchResult = await apolloClient.mutate<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>(mutationOptions);
        
      return { ...mutation, objects: mutation?.data?.insert_projects?.returning || [] };
    }
  

    // Update Helper
    //
    type UpdateProjectExploreByIdQueryResult = FetchResult<UpdateProjectExploreByIdMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectExploreByIdHelperResultEx = UpdateProjectExploreByIdQueryResult & ProjectExploreByIdHelperResultEx;

    async function updateProjectExploreById({ apolloClient, projectsId, set, autoOptimisticResponse, options }: { apolloClient: ApolloClient<object>, projectsId: string, set: Projects_Set_Input, autoOptimisticResponse?:boolean, options?: Omit<MutationOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>, 'mutation'> }): Promise<UpdateProjectExploreByIdHelperResultEx> {
      const mutationOptions:MutationOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables> = { mutation: UpdateProjectExploreByIdDocument, variables: { id:projectsId, set }, ...options };
      if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
        mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<UpdateProjectExploreByIdMutation>({ operationType: 'update', entityName:'projects', objects:[{ id:projectsId, ...set }] }); 
        if(logLevel >= 2) console.log(' --> updateProjectExploreById - optimisticResponse:', mutationOptions.optimisticResponse);
      }

      const mutation:UpdateProjectExploreByIdQueryResult = await apolloClient.mutate<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>(mutationOptions);
        
      return { ...mutation, projectExplore: mutation?.data?.update_projects?.returning && mutation.data.update_projects.returning[0] };
    }
  

    // Update Objects Helper
    //
    type UpdateProjectExploreObjectsFetchResult = FetchResult<UpdateProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectExploreObjectsHelperResultEx = UpdateProjectExploreObjectsFetchResult & ProjectExploreObjectsHelperResultEx;

    async function updateProjectExploreObjects({ apolloClient, options }: { apolloClient: ApolloClient<object>, options: Omit<MutationOptions<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>, 'mutation'> }): Promise<UpdateProjectExploreObjectsHelperResultEx> {  
      const mutation:UpdateProjectExploreObjectsFetchResult = await apolloClient.mutate<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>({ mutation: UpdateProjectExploreDocument, ...options } );
        
      return { ...mutation, objects:mutation?.data?.update_projects?.returning || [] };
    }
  

    // ProjectExplore Fragment Helper Object
    //------------------------------------------------

    export const ProjectExploreFragmentGQLHelper = {
      cacheGetDataId: cacheGetDataIdForProjectExplore,
      cacheReadFragmentById: cacheReadFragmentProjectExploreById,
      cacheWriteFragmentById: cacheWriteFragmentProjectExploreById,
      cacheReadQueryById: cacheReadQueryProjectExploreById,
      cacheWriteQueryById: cacheWriteQueryProjectExploreById,
      cacheReadQueryObjects: cacheReadQueryProjectExploreObjects,
      cacheWriteQueryObjects: cacheWriteQueryProjectExploreObjects,
      cacheWriteQueryInsert: cacheWriteQueryProjectExploreInsert,
      cacheWriteQueryRemove: cacheWriteQueryProjectExploreRemove,
      queryById: queryProjectExploreById,
      queryObjects: queryProjectExploreObjects,
      watchQueryById: watchQueryProjectExploreById,
      watchQueryObjects: watchQueryProjectExploreObjects,
      subscribeToById: subscribeToProjectExploreById,
      subscribeToObjects: subscribeToProjectExploreObjects,
      insert: insertProjectExplore,
      insertWithOnConflict: insertProjectExploreWithOnConflict,
      insertObjects: insertProjectExploreObjects,
      updateById: updateProjectExploreById,
      updateObjects: updateProjectExploreObjects
    }
  

    // COMBINED HELPER OBJECT
    //------------------------------------------------
    export const GQLHelpers = {
      Fragments: {
        Project: ProjectFragmentGQLHelper,
        ProjectExplore: ProjectExploreFragmentGQLHelper
      },
      Models: {
        Projects: ProjectsModelGQLHelper
      }
    }
  