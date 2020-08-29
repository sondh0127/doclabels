import { ObjectWithId, generateOptimisticResponseForMutation, generateUpdateFunctionForMutation, stripInsertInputClientFields } from 'graphql-codegen-hasura-core'
import { QueryHookOptions, useQuery, LazyQueryHookOptions, useLazyQuery, MutationHookOptions, useMutation, QueryLazyOptions, MutationFunctionOptions, LazyQueryResult, MutationTuple, FetchResult, SubscriptionResult, SubscriptionHookOptions, useSubscription, ApolloError, SubscribeToMoreOptions } from '@apollo/client';
import { ProjectFragment } from '../';
import { QueryProjectByIdQuery } from '../';
import { QueryProjectByIdQueryVariables } from '../';
import { QueryProjectByIdDocument } from '../';
import { QueryProjectObjectsQuery } from '../';
import { QueryProjectObjectsDocument } from '../';
import { QueryProjectObjectsQueryVariables } from '../';
import { SubscribeToProjectByIdSubscription } from '../';
import { SubscribeToProjectByIdSubscriptionVariables } from '../';
import { SubscribeToProjectByIdDocument } from '../';
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
import { QueryProjectExploreByIdQuery } from '../';
import { QueryProjectExploreByIdQueryVariables } from '../';
import { QueryProjectExploreByIdDocument } from '../';
import { QueryProjectExploreObjectsQuery } from '../';
import { QueryProjectExploreObjectsDocument } from '../';
import { QueryProjectExploreObjectsQueryVariables } from '../';
import { SubscribeToProjectExploreByIdSubscription } from '../';
import { SubscribeToProjectExploreByIdSubscriptionVariables } from '../';
import { SubscribeToProjectExploreByIdDocument } from '../';
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
    export type RemoveEntitiesQueryHookResultEx = { affected_rows:number };
  

    // projects REACT
    //------------------------------------------------

    export type ProjectByIdHookResultEx = { project:ProjectFragment | null | undefined };
    export type ProjectObjectsHookResultEx = { objects:ProjectFragment[] };

  

    /**
     *  Query Hook
     */

    // Types
    type QueryProjectByIdResult = LazyQueryResult<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>;
    type QueryProjectByIdSubScribeToMore = (options?: Omit<SubscribeToMoreOptions<QueryProjectByIdQuery, QueryProjectByIdQueryVariables, QueryProjectByIdQuery>, 'document' | 'variables'> | undefined) => void
    export type QueryProjectByIdResultEx = Omit<QueryProjectByIdResult, 'subscribeToMore'> & { subscribeToMore:QueryProjectByIdSubScribeToMore } & ProjectByIdHookResultEx;

    // Function
    function useQueryProjectById({ projectsId, options }: { projectsId: string; options?: Omit<QueryHookOptions<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>, "query" | "variables">; }): QueryProjectByIdResultEx {
      const _query: QueryProjectByIdResult = useQuery<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>(QueryProjectByIdDocument, { variables: { projectsId }, ...options });
      
      const typedSubscribeToMore:QueryProjectByIdSubScribeToMore = (options) => { _query.subscribeToMore({document: QueryProjectByIdDocument, variables: { projectsId } as QueryProjectByIdQueryVariables, ...options });}
      const { subscribeToMore, ...query } = _query;      
      return { ...query, subscribeToMore:typedSubscribeToMore, project: query?.data?.projects_by_pk };
    }
    

    /**
     *  Lazy Query Hook
     */
    
    // Types
    type PickQueryProjectByIdFn = (query: QueryProjectByIdQuery | null | undefined) =>ProjectFragment | null | undefined;
    type QueryProjectByIdLazyFn = [(options?: QueryLazyOptions<QueryProjectByIdQueryVariables> | undefined) => void, QueryProjectByIdResult]
    type QueryProjectByIdWrappedLazyFn = (options: Omit<QueryLazyOptions<QueryProjectByIdQueryVariables>, "variables">) => void;
    export type QueryProjectByIdLazyReturn = [QueryProjectByIdWrappedLazyFn, QueryProjectByIdResultEx];

    // Function
    function useQueryProjectByIdLazy({ projectsId, options }: { projectsId: string; options?: Omit<QueryHookOptions<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>, "query" | "variables">; }): QueryProjectByIdLazyReturn {
      const lazyQuery: QueryProjectByIdLazyFn = useLazyQuery<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>(QueryProjectByIdDocument, options);
      
      // Setting up typed version of lazyQuery
      const pickQueryProjectById: PickQueryProjectByIdFn = query => { return query && query.projects_by_pk; };
      const wrappedLazyQuery: QueryProjectByIdWrappedLazyFn = (options) => { return lazyQuery[0](options); };
      
      // Switching out SubcribeToMore with typed version
      const typedSubcribeToMore:QueryProjectByIdSubScribeToMore = (options) => { lazyQuery[1].subscribeToMore && lazyQuery[1].subscribeToMore({document: QueryProjectByIdDocument, variables: { projectsId } as QueryProjectByIdQueryVariables, ...options });}
      const { subscribeToMore, ...lazyQueryResult } = lazyQuery[1];  

      return [wrappedLazyQuery, { ...lazyQueryResult, subscribeToMore:typedSubcribeToMore, project: pickQueryProjectById(lazyQuery[1].data) }];
    }
    

    /**
     *  Query Collection Hook
     */

    // Types
    export type QueryProjectObjectsResult = LazyQueryResult<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>;
    type QueryProjectObjectsSubScribeToMore = (options?: Omit<SubscribeToMoreOptions<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables, QueryProjectObjectsQuery>, 'document' | 'variables'> | undefined) => void
    export type QueryProjectObjectsResultEx = Omit<QueryProjectObjectsResult, 'subscribeToMore'> & { subscribeToMore:QueryProjectObjectsSubScribeToMore } & ProjectObjectsHookResultEx;

    // Function
    function useQueryProjectObjects(options: Omit<QueryHookOptions<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>, "query">): QueryProjectObjectsResultEx {
      const _query:QueryProjectObjectsResult = useQuery<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>(QueryProjectObjectsDocument, options);

      const typedSubscribeToMore:QueryProjectObjectsSubScribeToMore = (options) => { _query.subscribeToMore({document: QueryProjectObjectsDocument, ...options });}
      const { subscribeToMore, ...query } = _query;  

      return { ...query, subscribeToMore:typedSubscribeToMore, objects: query?.data?.projects || [] };
    }
    
  
    /**
     *  Lazy Query Collection Hook
     */

    // Types
    type PickQueryProjectObjectsFn = (query: QueryProjectObjectsQuery | null | undefined) => ProjectFragment[];
    type QueryProjectObjectsLazyFn = [(options?: QueryLazyOptions<QueryProjectObjectsQueryVariables> | undefined) => void, QueryProjectObjectsResult]
    type QueryProjectObjectsWrappedLazyFn = (options?: QueryLazyOptions<QueryProjectObjectsQueryVariables>) => void;
    export type QueryProjectObjectsLazyReturn = [QueryProjectObjectsWrappedLazyFn, QueryProjectObjectsResultEx];

    // Function
    function useQueryProjectObjectsLazy(options?: Omit<LazyQueryHookOptions<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>, "query">): QueryProjectObjectsLazyReturn {
      const lazyQuery: QueryProjectObjectsLazyFn = useLazyQuery<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>(QueryProjectObjectsDocument, options);
      
      // Setting up typed version of lazyQuery
      const pickObjects: PickQueryProjectObjectsFn = (query: QueryProjectObjectsQuery | null | undefined) => { return query?.projects || []; };
      const wrappedLazyQuery: QueryProjectObjectsWrappedLazyFn = (options) => { return lazyQuery[0]( options ); };
      
      // Switching out SubcribeToMore with typed version
      const typedSubcribeToMore:QueryProjectObjectsSubScribeToMore = (options) => { lazyQuery[1].subscribeToMore && lazyQuery[1].subscribeToMore({document: QueryProjectObjectsDocument, ...options });}
      const { subscribeToMore, ...lazyQueryResult } = lazyQuery[1];  
      
      return [wrappedLazyQuery, { ...lazyQueryResult, subscribeToMore:typedSubcribeToMore, objects: pickObjects(lazyQuery[1].data) }];
    }
  
     
    /**
     *  Subscription Hook
     */

    // Types
    type SubscribeToProjectByIdResult = { variables?: SubscribeToProjectByIdSubscriptionVariables; loading: boolean; data?: SubscribeToProjectByIdSubscription; error?: ApolloError | undefined; };
    export type SubscribeToProjectByIdResultEx = SubscribeToProjectByIdResult & ProjectByIdHookResultEx;

    // Function
    function useSubscribeToProjectById({ projectsId, options }: { projectsId: string; options?: Omit<SubscriptionHookOptions<SubscribeToProjectByIdSubscription, SubscribeToProjectByIdSubscriptionVariables>, "query" | "variables">; }): SubscribeToProjectByIdResultEx {
      const subscription: SubscribeToProjectByIdResult = useSubscription<SubscribeToProjectByIdSubscription, SubscribeToProjectByIdSubscriptionVariables>(SubscribeToProjectByIdDocument, { variables: { projectsId }, ...options });
      return { ...subscription, project: subscription?.data?.projects_by_pk };
    }
    

    /**
     *  Subscription Collection Hook
     */

    // Types
    export type SubscribeToProjectObjectsResult = { variables?: SubscribeToProjectObjectsSubscriptionVariables; loading: boolean; data?: SubscribeToProjectObjectsSubscription; error?: ApolloError | undefined; };
    export type SubscribeToProjectObjectsResultEx = SubscribeToProjectObjectsResult & ProjectObjectsHookResultEx;

    // Function
    function useSubscribeToProjectObjects(options: Omit<SubscriptionHookOptions<SubscribeToProjectObjectsSubscription, SubscribeToProjectObjectsSubscriptionVariables>, "query">): SubscribeToProjectObjectsResultEx {
      const subscription:SubscribeToProjectObjectsResult = useSubscription<SubscribeToProjectObjectsSubscription, SubscribeToProjectObjectsSubscriptionVariables>(SubscribeToProjectObjectsDocument, options);
      return { ...subscription, objects: subscription?.data?.projects || [] };
    }
    

    /**
     *  Insert Hooks
     */

    // Types
    type InsertProjectMutationResult = FetchResult<InsertProjectMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectMutationResultEx = InsertProjectMutationResult & ProjectByIdHookResultEx;

    type PickInsertProjectFn = (mutation: InsertProjectMutation | null | undefined) => ProjectFragment | null | undefined;
    type InsertProjectLazyMutationFn = MutationTuple<InsertProjectMutation, InsertProjectMutationVariables>;
    type InsertProjectWrappedLazyMutationFn = ({ projects, autoOptimisticResponse, options }: { projects: Projects_Insert_Input; autoOptimisticResponse?:boolean, options?: Omit<MutationFunctionOptions<InsertProjectMutation, InsertProjectMutationVariables>, "variables">; }) => Promise<InsertProjectMutationResultEx>;
    export type InsertProjectLazyMutationReturn = [InsertProjectWrappedLazyMutationFn, InsertProjectMutationResultEx];

    // Function
    function useInsertProject(options?: Omit<MutationHookOptions<InsertProjectMutation, InsertProjectMutationVariables>, "mutation" | "variables">): InsertProjectLazyMutationReturn {
      const lazyMutation: InsertProjectLazyMutationFn = useMutation<InsertProjectMutation, InsertProjectMutationVariables>(InsertProjectDocument, options);
      const pickProject: PickInsertProjectFn = (mutation) => { return mutation?.insert_projects?.returning && mutation?.insert_projects?.returning[0]; };

      const wrappedLazyMutation: InsertProjectWrappedLazyMutationFn = async ({ projects, autoOptimisticResponse, options }) => {
        const objectForInsert = stripInsertInputClientFields({ input: projects });
        const mutationOptions:MutationFunctionOptions<InsertProjectMutation, InsertProjectMutationVariables> = { variables: { objects: [objectForInsert] }, ...options };
        if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
          if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`);
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId] 
        }); }

        const fetchResult = await lazyMutation[0](mutationOptions);
        
        return { ...fetchResult, project: pickProject(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], project: pickProject(lazyMutation[1].data) }];
    }
  

    //
    //

    // Types
    type InsertProjectWithOnConflictMutationResult = FetchResult<InsertProjectWithOnConflictMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectWithOnConflictMutationResultEx = InsertProjectWithOnConflictMutationResult & ProjectByIdHookResultEx;

    type InsertProjectWithOnConflictLazyMutationFn = MutationTuple<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>;
    type InsertProjectWithOnConflictWrappedLazyMutationFn = ({ projects, onConflict, autoOptimisticResponse, options }: { projects: Projects_Insert_Input; onConflict: Projects_On_Conflict, autoOptimisticResponse?:boolean; options?: Omit<MutationFunctionOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>, "variables">; }) => Promise<InsertProjectWithOnConflictMutationResultEx>;
    export type InsertProjectWithOnConflictLazyMutationReturn = [InsertProjectWithOnConflictWrappedLazyMutationFn, InsertProjectWithOnConflictMutationResultEx];

    // Function
    function useInsertProjectWithOnConflict( options?: Omit<MutationHookOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>, "mutation" | "variables"> ): InsertProjectWithOnConflictLazyMutationReturn {
      const lazyMutation: InsertProjectWithOnConflictLazyMutationFn = useMutation<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>(InsertProjectWithOnConflictDocument, options);
      const pickProject: PickInsertProjectFn = (mutation: InsertProjectWithOnConflictMutation | null | undefined) => { return mutation?.insert_projects?.returning && mutation.insert_projects.returning[0]; };

      const wrappedLazyMutation:InsertProjectWithOnConflictWrappedLazyMutationFn = async ({ projects, onConflict, autoOptimisticResponse, options }) => {
        const objectForInsert = stripInsertInputClientFields({ input: projects });
        const mutationOptions:MutationFunctionOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables> = { variables: { objects: [objectForInsert], onConflict }, ...options };
        if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
          if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`);
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectWithOnConflictMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId] }); 
        }

        const fetchResult = await lazyMutation[0](mutationOptions);
        
        return { ...fetchResult, project: pickProject(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], project: pickProject(lazyMutation[1].data) }];
    }
  

    // Types
    type InsertProjectObjectsMutationResult = FetchResult<InsertProjectMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectObjectsMutationResultEx = InsertProjectMutationResult & ProjectObjectsHookResultEx;

    type PickInsertProjectObjectsFn = (mutation: InsertProjectMutation | null | undefined) => ProjectFragment[];
    type InsertProjectObjectsLazyMutationFn = MutationTuple<InsertProjectMutation, InsertProjectMutationVariables>;
    type InsertProjectObjectsWrappedLazyMutationFn = (options?: MutationFunctionOptions<InsertProjectMutation, InsertProjectMutationVariables>) => Promise<InsertProjectObjectsMutationResultEx>;
    export type InsertProjectObjectsLazyMutationReturn = [InsertProjectObjectsWrappedLazyMutationFn, InsertProjectObjectsMutationResultEx];

    // Function
    function useInsertProjectObjects(options?: Omit<MutationHookOptions<InsertProjectMutation, InsertProjectMutationVariables>, "mutation">): InsertProjectObjectsLazyMutationReturn {
      const lazyMutation: InsertProjectObjectsLazyMutationFn = useMutation<InsertProjectMutation, InsertProjectMutationVariables>(InsertProjectDocument, options);
      const pickObjects: PickInsertProjectObjectsFn = (mutation: InsertProjectMutation | null | undefined) => { return mutation?.insert_projects?.returning || []; };

      const wrappedLazyMutation: InsertProjectObjectsWrappedLazyMutationFn = async ( options ) => {
        if(options && options.variables && options.variables.objects) options.variables.objects = options.variables.objects.map(objectItem => stripInsertInputClientFields({input: objectItem}));
        const fetchResult: InsertProjectObjectsMutationResult = await lazyMutation[0](options);
        return { ...fetchResult, objects: pickObjects(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], objects: pickObjects(lazyMutation[1].data) }];
    }
  

    /**
     *  Update Hooks
     */
    
    type UpdateProjectByIdMutationResult = FetchResult<UpdateProjectByIdMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectByIdMutationResultEx = UpdateProjectByIdMutationResult & ProjectByIdHookResultEx;

    type PickUpdateProjectByIdFn = (mutation: UpdateProjectByIdMutation | null | undefined) => ProjectFragment | null | undefined;
    type UpdateProjectByIdLazyMutationFn = MutationTuple<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>;
    type UpdateProjectByIdWrappedLazyMutationFn = ({ projectsId, set, autoOptimisticResponse, options }: { projectsId: string; set: Projects_Set_Input; autoOptimisticResponse?: boolean; options?: Omit<MutationFunctionOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>, "variables">; }) => Promise<UpdateProjectByIdMutationResultEx>;
    export type UpdateProjectByIdLazyMutationReturn = [UpdateProjectByIdWrappedLazyMutationFn, UpdateProjectByIdMutationResultEx];

    function useUpdateProjectById(options?: Omit<MutationHookOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>, "mutation" | "variables">): UpdateProjectByIdLazyMutationReturn {
      const lazyMutation: UpdateProjectByIdLazyMutationFn = useMutation<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>(UpdateProjectByIdDocument, options);

      const pickProject: PickUpdateProjectByIdFn = (mutation) => { return mutation?.update_projects?.returning && mutation.update_projects!.returning[0]; };

      const wrappedLazyMutation: UpdateProjectByIdWrappedLazyMutationFn = async ({ projectsId, set, autoOptimisticResponse, options }) => {
        const mutationOptions: MutationFunctionOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables> = { variables: { id: projectsId, set }, ...options };
        if (autoOptimisticResponse && (!options || !options.optimisticResponse)) {
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<UpdateProjectByIdMutation>({ operationType: 'update', entityName:'projects', objects:[{ id:projectsId, ...set }] });
        }

        const fetchResult: UpdateProjectByIdMutationResult = await lazyMutation[0]({ variables: { id: projectsId, set }, ...mutationOptions });
        return { ...fetchResult, project: pickProject(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], project: pickProject(lazyMutation[1].data) }];
    }
  

    //
    //

    // Types
    type UpdateProjectObjectsMutationResult = FetchResult<UpdateProjectMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectObjectsMutationResultEx = UpdateProjectObjectsMutationResult & ProjectObjectsHookResultEx;

    // Function
    type PickUpdateProjectObjectsFn = (mutation: UpdateProjectMutation | null | undefined) => ProjectFragment[];
    type UpdateProjectObjectsLazyMutationFn = MutationTuple<UpdateProjectMutation, UpdateProjectMutationVariables>;
    type UpdateProjectObjectsWrappedLazyMutationFn = (options?: MutationFunctionOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) => Promise<UpdateProjectObjectsMutationResultEx>;
    export type UpdateProjectObjectsLazyMutationReturn = [UpdateProjectObjectsWrappedLazyMutationFn, UpdateProjectObjectsMutationResultEx];

    function useUpdateProjectObjects(options?: Omit<MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>, "mutation">): UpdateProjectObjectsLazyMutationReturn {
      const lazyMutation: UpdateProjectObjectsLazyMutationFn = useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);

      const pickObjects: PickUpdateProjectObjectsFn = (mutation: UpdateProjectMutation | null | undefined) => {
        return mutation?.update_projects?.returning || [];
      };

      const wrappedLazyMutation: UpdateProjectObjectsWrappedLazyMutationFn = async (options) => {
        const fetchResult: UpdateProjectObjectsMutationResult = await lazyMutation[0](options);
        return { ...fetchResult, objects: pickObjects(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], objects: pickObjects(lazyMutation[1].data) }];
    }
  

    /**
     *  Delete Hooks
     */

    // Types
    type RemoveProjectsModelByIdFetchResult = FetchResult<RemoveProjectsModelByIdMutation, Record<string, any>, Record<string, any>>;
    export type RemoveProjectsModelByIdMutationResultEx = RemoveProjectsModelByIdFetchResult & RemoveEntitiesQueryHookResultEx;

    // Function
    type PickRemoveProjectsModelFn = (mutation: RemoveProjectsModelByIdMutation | null | undefined) => number;
    type RemoveProjectsModelLazyMutationFn = MutationTuple<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>;
    type RemoveProjectsModelWrappedLazyMutationFn = ({ projectsId, autoOptimisticResponse, options }: { projectsId: string; autoOptimisticResponse?:boolean, options?: Omit<MutationFunctionOptions<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>, "variables">; }) => Promise<RemoveProjectsModelByIdMutationResultEx>;
    export type RemoveProjectsModelLazyMutationReturn = [RemoveProjectsModelWrappedLazyMutationFn, RemoveProjectsModelByIdMutationResultEx];

    function useRemoveProjectsModelById(options?: Omit<MutationHookOptions<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>, "mutation" | "variables">) {
      const lazyMutation: RemoveProjectsModelLazyMutationFn = useMutation<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>(RemoveProjectsModelByIdDocument, options);
      
      const pickAffectedRows: PickRemoveProjectsModelFn = (mutation: RemoveProjectsModelByIdMutation | null | undefined) => {
        return mutation?.delete_projects?.affected_rows || 0;
      };

      const wrappedLazyMutation: RemoveProjectsModelWrappedLazyMutationFn = async ({ projectsId, autoOptimisticResponse, options }) => {
        const mutationOptions:MutationFunctionOptions<RemoveProjectsModelMutation, RemoveProjectsModelByIdMutationVariables> = { variables: { id: projectsId }, ...options };
        if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<RemoveProjectsModelMutation>({ operationType: 'delete', entityName:'projects', objects:[{ id:projectsId }] });        }
        if((!options || !options.update)){ mutationOptions.update = generateUpdateFunctionForMutation<RemoveProjectsModelByIdMutation>({ operationType: 'delete', entityName:'projects', entityId:projectsId }); }
        
        const fetchResult: RemoveProjectsModelByIdFetchResult = await lazyMutation[0](mutationOptions);
        return { ...fetchResult, affected_rows: pickAffectedRows(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], affected_rows: pickAffectedRows(lazyMutation[1].data) }] as [
        typeof wrappedLazyMutation,
        typeof lazyMutation[1] & { affected_rows: ReturnType<typeof pickAffectedRows> }
      ];
    }
  

    //
    //

    // Types
    type RemoveProjectsModelObjectsMutationResult = FetchResult<RemoveProjectsModelMutation, Record<string, any>, Record<string, any>>;
    export type RemoveProjectsModelObjectsMutationResultEx = RemoveProjectsModelObjectsMutationResult & RemoveEntitiesQueryHookResultEx;

    // Function
    type PickRemoveProjectsModelObjectsFn = (mutation: RemoveProjectsModelMutation | null | undefined) => number;
    type RemoveProjectsModelObjectsLazyMutationFn = MutationTuple<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>;
    type RemoveProjectsModelObjectsWrappedLazyMutationFn = (options: MutationFunctionOptions<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>) => Promise<RemoveProjectsModelObjectsMutationResultEx>;
    export type RemoveProjectsModelObjectsLazyMutationReturn = [RemoveProjectsModelObjectsWrappedLazyMutationFn, RemoveProjectsModelObjectsMutationResultEx];

    function useRemoveProjectsModelObjects(options?: Omit<MutationHookOptions<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>, "mutation">): RemoveProjectsModelObjectsLazyMutationReturn {
      const lazyMutation = useMutation<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>(RemoveProjectsModelDocument, options);

      const pickAffectedRows: PickRemoveProjectsModelObjectsFn = (mutation: RemoveProjectsModelMutation | null | undefined) => {
        return mutation?.delete_projects?.affected_rows || 0;
      };

      const wrappedLazyMutation: RemoveProjectsModelObjectsWrappedLazyMutationFn = async (options) => {
        const fetchResult: RemoveProjectsModelObjectsMutationResult = await lazyMutation[0](options);
        return { ...fetchResult, affected_rows: pickAffectedRows(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], affected_rows: pickAffectedRows(lazyMutation[1].data) }];
    }
  

    // Project Fragment Helper Object
    //------------------------------------------------

    export const ProjectFragmentGQLHooks = {
      useQueryById: useQueryProjectById,
      useQueryByIdLazy: useQueryProjectByIdLazy,
      useQueryObjects: useQueryProjectObjects,
      useQueryObjectsLazy: useQueryProjectObjectsLazy,
      useSubscribeToById: useSubscribeToProjectById,
      useSubscribeToObjects: useSubscribeToProjectObjects,
      useInsert: useInsertProject,
      useInsertWithOnConflict: useInsertProjectWithOnConflict,
      useInsertObjects: useInsertProjectObjects,
      useUpdateById: useUpdateProjectById,
      useUpdateObjects: useUpdateProjectObjects,
    }
    

    // projects MODEL HOOKS OBJECT
    //------------------------------------------------

    export const ProjectsModelGQLHooks = {
      useRemoveById: useRemoveProjectsModelById,
      useRemoveObjects: useRemoveProjectsModelObjects
    }
  

    // projects REACT
    //------------------------------------------------

    export type ProjectExploreByIdHookResultEx = { projectExplore:ProjectExploreFragment | null | undefined };
    export type ProjectExploreObjectsHookResultEx = { objects:ProjectExploreFragment[] };

  

    /**
     *  Query Hook
     */

    // Types
    type QueryProjectExploreByIdResult = LazyQueryResult<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>;
    type QueryProjectExploreByIdSubScribeToMore = (options?: Omit<SubscribeToMoreOptions<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables, QueryProjectExploreByIdQuery>, 'document' | 'variables'> | undefined) => void
    export type QueryProjectExploreByIdResultEx = Omit<QueryProjectExploreByIdResult, 'subscribeToMore'> & { subscribeToMore:QueryProjectExploreByIdSubScribeToMore } & ProjectExploreByIdHookResultEx;

    // Function
    function useQueryProjectExploreById({ projectsId, options }: { projectsId: string; options?: Omit<QueryHookOptions<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>, "query" | "variables">; }): QueryProjectExploreByIdResultEx {
      const _query: QueryProjectExploreByIdResult = useQuery<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>(QueryProjectExploreByIdDocument, { variables: { projectsId }, ...options });
      
      const typedSubscribeToMore:QueryProjectExploreByIdSubScribeToMore = (options) => { _query.subscribeToMore({document: QueryProjectExploreByIdDocument, variables: { projectsId } as QueryProjectExploreByIdQueryVariables, ...options });}
      const { subscribeToMore, ...query } = _query;      
      return { ...query, subscribeToMore:typedSubscribeToMore, projectExplore: query?.data?.projects_by_pk };
    }
    

    /**
     *  Lazy Query Hook
     */
    
    // Types
    type PickQueryProjectExploreByIdFn = (query: QueryProjectExploreByIdQuery | null | undefined) =>ProjectExploreFragment | null | undefined;
    type QueryProjectExploreByIdLazyFn = [(options?: QueryLazyOptions<QueryProjectExploreByIdQueryVariables> | undefined) => void, QueryProjectExploreByIdResult]
    type QueryProjectExploreByIdWrappedLazyFn = (options: Omit<QueryLazyOptions<QueryProjectExploreByIdQueryVariables>, "variables">) => void;
    export type QueryProjectExploreByIdLazyReturn = [QueryProjectExploreByIdWrappedLazyFn, QueryProjectExploreByIdResultEx];

    // Function
    function useQueryProjectExploreByIdLazy({ projectsId, options }: { projectsId: string; options?: Omit<QueryHookOptions<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>, "query" | "variables">; }): QueryProjectExploreByIdLazyReturn {
      const lazyQuery: QueryProjectExploreByIdLazyFn = useLazyQuery<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>(QueryProjectExploreByIdDocument, options);
      
      // Setting up typed version of lazyQuery
      const pickQueryProjectExploreById: PickQueryProjectExploreByIdFn = query => { return query && query.projects_by_pk; };
      const wrappedLazyQuery: QueryProjectExploreByIdWrappedLazyFn = (options) => { return lazyQuery[0](options); };
      
      // Switching out SubcribeToMore with typed version
      const typedSubcribeToMore:QueryProjectExploreByIdSubScribeToMore = (options) => { lazyQuery[1].subscribeToMore && lazyQuery[1].subscribeToMore({document: QueryProjectExploreByIdDocument, variables: { projectsId } as QueryProjectExploreByIdQueryVariables, ...options });}
      const { subscribeToMore, ...lazyQueryResult } = lazyQuery[1];  

      return [wrappedLazyQuery, { ...lazyQueryResult, subscribeToMore:typedSubcribeToMore, projectExplore: pickQueryProjectExploreById(lazyQuery[1].data) }];
    }
    

    /**
     *  Query Collection Hook
     */

    // Types
    export type QueryProjectExploreObjectsResult = LazyQueryResult<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>;
    type QueryProjectExploreObjectsSubScribeToMore = (options?: Omit<SubscribeToMoreOptions<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables, QueryProjectExploreObjectsQuery>, 'document' | 'variables'> | undefined) => void
    export type QueryProjectExploreObjectsResultEx = Omit<QueryProjectExploreObjectsResult, 'subscribeToMore'> & { subscribeToMore:QueryProjectExploreObjectsSubScribeToMore } & ProjectExploreObjectsHookResultEx;

    // Function
    function useQueryProjectExploreObjects(options: Omit<QueryHookOptions<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>, "query">): QueryProjectExploreObjectsResultEx {
      const _query:QueryProjectExploreObjectsResult = useQuery<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>(QueryProjectExploreObjectsDocument, options);

      const typedSubscribeToMore:QueryProjectExploreObjectsSubScribeToMore = (options) => { _query.subscribeToMore({document: QueryProjectExploreObjectsDocument, ...options });}
      const { subscribeToMore, ...query } = _query;  

      return { ...query, subscribeToMore:typedSubscribeToMore, objects: query?.data?.projects || [] };
    }
    
  
    /**
     *  Lazy Query Collection Hook
     */

    // Types
    type PickQueryProjectExploreObjectsFn = (query: QueryProjectExploreObjectsQuery | null | undefined) => ProjectExploreFragment[];
    type QueryProjectExploreObjectsLazyFn = [(options?: QueryLazyOptions<QueryProjectExploreObjectsQueryVariables> | undefined) => void, QueryProjectExploreObjectsResult]
    type QueryProjectExploreObjectsWrappedLazyFn = (options?: QueryLazyOptions<QueryProjectExploreObjectsQueryVariables>) => void;
    export type QueryProjectExploreObjectsLazyReturn = [QueryProjectExploreObjectsWrappedLazyFn, QueryProjectExploreObjectsResultEx];

    // Function
    function useQueryProjectExploreObjectsLazy(options?: Omit<LazyQueryHookOptions<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>, "query">): QueryProjectExploreObjectsLazyReturn {
      const lazyQuery: QueryProjectExploreObjectsLazyFn = useLazyQuery<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>(QueryProjectExploreObjectsDocument, options);
      
      // Setting up typed version of lazyQuery
      const pickObjects: PickQueryProjectExploreObjectsFn = (query: QueryProjectExploreObjectsQuery | null | undefined) => { return query?.projects || []; };
      const wrappedLazyQuery: QueryProjectExploreObjectsWrappedLazyFn = (options) => { return lazyQuery[0]( options ); };
      
      // Switching out SubcribeToMore with typed version
      const typedSubcribeToMore:QueryProjectExploreObjectsSubScribeToMore = (options) => { lazyQuery[1].subscribeToMore && lazyQuery[1].subscribeToMore({document: QueryProjectExploreObjectsDocument, ...options });}
      const { subscribeToMore, ...lazyQueryResult } = lazyQuery[1];  
      
      return [wrappedLazyQuery, { ...lazyQueryResult, subscribeToMore:typedSubcribeToMore, objects: pickObjects(lazyQuery[1].data) }];
    }
  
     
    /**
     *  Subscription Hook
     */

    // Types
    type SubscribeToProjectExploreByIdResult = { variables?: SubscribeToProjectExploreByIdSubscriptionVariables; loading: boolean; data?: SubscribeToProjectExploreByIdSubscription; error?: ApolloError | undefined; };
    export type SubscribeToProjectExploreByIdResultEx = SubscribeToProjectExploreByIdResult & ProjectExploreByIdHookResultEx;

    // Function
    function useSubscribeToProjectExploreById({ projectsId, options }: { projectsId: string; options?: Omit<SubscriptionHookOptions<SubscribeToProjectExploreByIdSubscription, SubscribeToProjectExploreByIdSubscriptionVariables>, "query" | "variables">; }): SubscribeToProjectExploreByIdResultEx {
      const subscription: SubscribeToProjectExploreByIdResult = useSubscription<SubscribeToProjectExploreByIdSubscription, SubscribeToProjectExploreByIdSubscriptionVariables>(SubscribeToProjectExploreByIdDocument, { variables: { projectsId }, ...options });
      return { ...subscription, projectExplore: subscription?.data?.projects_by_pk };
    }
    

    /**
     *  Subscription Collection Hook
     */

    // Types
    export type SubscribeToProjectExploreObjectsResult = { variables?: SubscribeToProjectExploreObjectsSubscriptionVariables; loading: boolean; data?: SubscribeToProjectExploreObjectsSubscription; error?: ApolloError | undefined; };
    export type SubscribeToProjectExploreObjectsResultEx = SubscribeToProjectExploreObjectsResult & ProjectExploreObjectsHookResultEx;

    // Function
    function useSubscribeToProjectExploreObjects(options: Omit<SubscriptionHookOptions<SubscribeToProjectExploreObjectsSubscription, SubscribeToProjectExploreObjectsSubscriptionVariables>, "query">): SubscribeToProjectExploreObjectsResultEx {
      const subscription:SubscribeToProjectExploreObjectsResult = useSubscription<SubscribeToProjectExploreObjectsSubscription, SubscribeToProjectExploreObjectsSubscriptionVariables>(SubscribeToProjectExploreObjectsDocument, options);
      return { ...subscription, objects: subscription?.data?.projects || [] };
    }
    

    /**
     *  Insert Hooks
     */

    // Types
    type InsertProjectExploreMutationResult = FetchResult<InsertProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectExploreMutationResultEx = InsertProjectExploreMutationResult & ProjectExploreByIdHookResultEx;

    type PickInsertProjectExploreFn = (mutation: InsertProjectExploreMutation | null | undefined) => ProjectExploreFragment | null | undefined;
    type InsertProjectExploreLazyMutationFn = MutationTuple<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>;
    type InsertProjectExploreWrappedLazyMutationFn = ({ projects, autoOptimisticResponse, options }: { projects: Projects_Insert_Input; autoOptimisticResponse?:boolean, options?: Omit<MutationFunctionOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>, "variables">; }) => Promise<InsertProjectExploreMutationResultEx>;
    export type InsertProjectExploreLazyMutationReturn = [InsertProjectExploreWrappedLazyMutationFn, InsertProjectExploreMutationResultEx];

    // Function
    function useInsertProjectExplore(options?: Omit<MutationHookOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>, "mutation" | "variables">): InsertProjectExploreLazyMutationReturn {
      const lazyMutation: InsertProjectExploreLazyMutationFn = useMutation<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>(InsertProjectExploreDocument, options);
      const pickProjectExplore: PickInsertProjectExploreFn = (mutation) => { return mutation?.insert_projects?.returning && mutation?.insert_projects?.returning[0]; };

      const wrappedLazyMutation: InsertProjectExploreWrappedLazyMutationFn = async ({ projects, autoOptimisticResponse, options }) => {
        const objectForInsert = stripInsertInputClientFields({ input: projects });
        const mutationOptions:MutationFunctionOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables> = { variables: { objects: [objectForInsert] }, ...options };
        if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
          if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`);
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectExploreMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId] 
        }); }

        const fetchResult = await lazyMutation[0](mutationOptions);
        
        return { ...fetchResult, projectExplore: pickProjectExplore(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], projectExplore: pickProjectExplore(lazyMutation[1].data) }];
    }
  

    //
    //

    // Types
    type InsertProjectExploreWithOnConflictMutationResult = FetchResult<InsertProjectExploreWithOnConflictMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectExploreWithOnConflictMutationResultEx = InsertProjectExploreWithOnConflictMutationResult & ProjectExploreByIdHookResultEx;

    type InsertProjectExploreWithOnConflictLazyMutationFn = MutationTuple<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>;
    type InsertProjectExploreWithOnConflictWrappedLazyMutationFn = ({ projects, onConflict, autoOptimisticResponse, options }: { projects: Projects_Insert_Input; onConflict: Projects_On_Conflict, autoOptimisticResponse?:boolean; options?: Omit<MutationFunctionOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>, "variables">; }) => Promise<InsertProjectExploreWithOnConflictMutationResultEx>;
    export type InsertProjectExploreWithOnConflictLazyMutationReturn = [InsertProjectExploreWithOnConflictWrappedLazyMutationFn, InsertProjectExploreWithOnConflictMutationResultEx];

    // Function
    function useInsertProjectExploreWithOnConflict( options?: Omit<MutationHookOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>, "mutation" | "variables"> ): InsertProjectExploreWithOnConflictLazyMutationReturn {
      const lazyMutation: InsertProjectExploreWithOnConflictLazyMutationFn = useMutation<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>(InsertProjectExploreWithOnConflictDocument, options);
      const pickProjectExplore: PickInsertProjectExploreFn = (mutation: InsertProjectExploreWithOnConflictMutation | null | undefined) => { return mutation?.insert_projects?.returning && mutation.insert_projects.returning[0]; };

      const wrappedLazyMutation:InsertProjectExploreWithOnConflictWrappedLazyMutationFn = async ({ projects, onConflict, autoOptimisticResponse, options }) => {
        const objectForInsert = stripInsertInputClientFields({ input: projects });
        const mutationOptions:MutationFunctionOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables> = { variables: { objects: [objectForInsert], onConflict }, ...options };
        if(autoOptimisticResponse && (!options || !options.optimisticResponse)){ 
          if(!objectForInsert.id) throw new Error(`if autoOptimisticResponse = true, id must be set in object 'projects'`);
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<InsertProjectExploreWithOnConflictMutation>({ operationType: 'insert', entityName:'projects', objects:[objectForInsert as Projects_Insert_Input & ObjectWithId] }); 
        }

        const fetchResult = await lazyMutation[0](mutationOptions);
        
        return { ...fetchResult, projectExplore: pickProjectExplore(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], projectExplore: pickProjectExplore(lazyMutation[1].data) }];
    }
  

    // Types
    type InsertProjectExploreObjectsMutationResult = FetchResult<InsertProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type InsertProjectExploreObjectsMutationResultEx = InsertProjectExploreMutationResult & ProjectExploreObjectsHookResultEx;

    type PickInsertProjectExploreObjectsFn = (mutation: InsertProjectExploreMutation | null | undefined) => ProjectExploreFragment[];
    type InsertProjectExploreObjectsLazyMutationFn = MutationTuple<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>;
    type InsertProjectExploreObjectsWrappedLazyMutationFn = (options?: MutationFunctionOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>) => Promise<InsertProjectExploreObjectsMutationResultEx>;
    export type InsertProjectExploreObjectsLazyMutationReturn = [InsertProjectExploreObjectsWrappedLazyMutationFn, InsertProjectExploreObjectsMutationResultEx];

    // Function
    function useInsertProjectExploreObjects(options?: Omit<MutationHookOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>, "mutation">): InsertProjectExploreObjectsLazyMutationReturn {
      const lazyMutation: InsertProjectExploreObjectsLazyMutationFn = useMutation<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>(InsertProjectExploreDocument, options);
      const pickObjects: PickInsertProjectExploreObjectsFn = (mutation: InsertProjectExploreMutation | null | undefined) => { return mutation?.insert_projects?.returning || []; };

      const wrappedLazyMutation: InsertProjectExploreObjectsWrappedLazyMutationFn = async ( options ) => {
        if(options && options.variables && options.variables.objects) options.variables.objects = options.variables.objects.map(objectItem => stripInsertInputClientFields({input: objectItem}));
        const fetchResult: InsertProjectExploreObjectsMutationResult = await lazyMutation[0](options);
        return { ...fetchResult, objects: pickObjects(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], objects: pickObjects(lazyMutation[1].data) }];
    }
  

    /**
     *  Update Hooks
     */
    
    type UpdateProjectExploreByIdMutationResult = FetchResult<UpdateProjectExploreByIdMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectExploreByIdMutationResultEx = UpdateProjectExploreByIdMutationResult & ProjectExploreByIdHookResultEx;

    type PickUpdateProjectExploreByIdFn = (mutation: UpdateProjectExploreByIdMutation | null | undefined) => ProjectExploreFragment | null | undefined;
    type UpdateProjectExploreByIdLazyMutationFn = MutationTuple<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>;
    type UpdateProjectExploreByIdWrappedLazyMutationFn = ({ projectsId, set, autoOptimisticResponse, options }: { projectsId: string; set: Projects_Set_Input; autoOptimisticResponse?: boolean; options?: Omit<MutationFunctionOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>, "variables">; }) => Promise<UpdateProjectExploreByIdMutationResultEx>;
    export type UpdateProjectExploreByIdLazyMutationReturn = [UpdateProjectExploreByIdWrappedLazyMutationFn, UpdateProjectExploreByIdMutationResultEx];

    function useUpdateProjectExploreById(options?: Omit<MutationHookOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>, "mutation" | "variables">): UpdateProjectExploreByIdLazyMutationReturn {
      const lazyMutation: UpdateProjectExploreByIdLazyMutationFn = useMutation<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>(UpdateProjectExploreByIdDocument, options);

      const pickProjectExplore: PickUpdateProjectExploreByIdFn = (mutation) => { return mutation?.update_projects?.returning && mutation.update_projects!.returning[0]; };

      const wrappedLazyMutation: UpdateProjectExploreByIdWrappedLazyMutationFn = async ({ projectsId, set, autoOptimisticResponse, options }) => {
        const mutationOptions: MutationFunctionOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables> = { variables: { id: projectsId, set }, ...options };
        if (autoOptimisticResponse && (!options || !options.optimisticResponse)) {
          mutationOptions.optimisticResponse = generateOptimisticResponseForMutation<UpdateProjectExploreByIdMutation>({ operationType: 'update', entityName:'projects', objects:[{ id:projectsId, ...set }] });
        }

        const fetchResult: UpdateProjectExploreByIdMutationResult = await lazyMutation[0]({ variables: { id: projectsId, set }, ...mutationOptions });
        return { ...fetchResult, projectExplore: pickProjectExplore(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], projectExplore: pickProjectExplore(lazyMutation[1].data) }];
    }
  

    //
    //

    // Types
    type UpdateProjectExploreObjectsMutationResult = FetchResult<UpdateProjectExploreMutation, Record<string, any>, Record<string, any>>;
    export type UpdateProjectExploreObjectsMutationResultEx = UpdateProjectExploreObjectsMutationResult & ProjectExploreObjectsHookResultEx;

    // Function
    type PickUpdateProjectExploreObjectsFn = (mutation: UpdateProjectExploreMutation | null | undefined) => ProjectExploreFragment[];
    type UpdateProjectExploreObjectsLazyMutationFn = MutationTuple<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>;
    type UpdateProjectExploreObjectsWrappedLazyMutationFn = (options?: MutationFunctionOptions<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>) => Promise<UpdateProjectExploreObjectsMutationResultEx>;
    export type UpdateProjectExploreObjectsLazyMutationReturn = [UpdateProjectExploreObjectsWrappedLazyMutationFn, UpdateProjectExploreObjectsMutationResultEx];

    function useUpdateProjectExploreObjects(options?: Omit<MutationHookOptions<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>, "mutation">): UpdateProjectExploreObjectsLazyMutationReturn {
      const lazyMutation: UpdateProjectExploreObjectsLazyMutationFn = useMutation<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>(UpdateProjectExploreDocument, options);

      const pickObjects: PickUpdateProjectExploreObjectsFn = (mutation: UpdateProjectExploreMutation | null | undefined) => {
        return mutation?.update_projects?.returning || [];
      };

      const wrappedLazyMutation: UpdateProjectExploreObjectsWrappedLazyMutationFn = async (options) => {
        const fetchResult: UpdateProjectExploreObjectsMutationResult = await lazyMutation[0](options);
        return { ...fetchResult, objects: pickObjects(fetchResult.data) };
      };

      return [wrappedLazyMutation, { ...lazyMutation[1], objects: pickObjects(lazyMutation[1].data) }];
    }
  

    // ProjectExplore Fragment Helper Object
    //------------------------------------------------

    export const ProjectExploreFragmentGQLHooks = {
      useQueryById: useQueryProjectExploreById,
      useQueryByIdLazy: useQueryProjectExploreByIdLazy,
      useQueryObjects: useQueryProjectExploreObjects,
      useQueryObjectsLazy: useQueryProjectExploreObjectsLazy,
      useSubscribeToById: useSubscribeToProjectExploreById,
      useSubscribeToObjects: useSubscribeToProjectExploreObjects,
      useInsert: useInsertProjectExplore,
      useInsertWithOnConflict: useInsertProjectExploreWithOnConflict,
      useInsertObjects: useInsertProjectExploreObjects,
      useUpdateById: useUpdateProjectExploreById,
      useUpdateObjects: useUpdateProjectExploreObjects,
    }
    

    /*
     * COMBINED HOOKS OBJECT
     */
    export const GQLHooks = {
      Fragments: {
        Project: ProjectFragmentGQLHooks,
        ProjectExplore: ProjectExploreFragmentGQLHooks
      },
      Models: {
        Projects: ProjectsModelGQLHooks
      }
    }
  