/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { ProjectFragmentDoc } from '../';
import { ProjectExploreFragmentDoc } from '../';

    // Project GQL
    //------------------------------------------------ 
  


    // Query: FetchById
    //
    const QUERY_PROJECT_BYID = gql`
  query queryProjectById($projectsId: uuid!) {
    projects_by_pk(id: $projectsId) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}`;


    // Query: Fetch
    //
    const QUERY_PROJECT_OBJECTS = gql`
  query queryProjectObjects(
    $distinct_on: [projects_select_column!]
    $where: projects_bool_exp
    $limit: Int
    $offset: Int
    $order_by: [projects_order_by!]
  ) {
    projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
  `;


    // Subscription: FetchById
    //
    const SUBSCRIBE_TO_PROJECT_BYID = gql`
  subscription subscribeToProjectById($projectsId: uuid!) {
    projects_by_pk(id: $projectsId) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}`;


    // Subscription: Fetch
    //
    const SUBSCRIBE_TO_PROJECT_OBJECTS = gql`
  subscription subscribeToProjectObjects(
    $distinct_on: [projects_select_column!]
    $where: projects_bool_exp
    $limit: Int
    $offset: Int
    $order_by: [projects_order_by!]
  ) {
    projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
  `;


    // Mutation: Insert
    //

    const INSERT_PROJECT = gql`
      mutation insertProject($objects: [projects_insert_input!]!) {
        insert_projects(objects: $objects) {
          affected_rows
          returning {
            ...Project
          }
        }
      }
      ${ProjectFragmentDoc}
    `;


    // Mutation: Insert
    //

    const INSERT_PROJECT_WITH_ONCONFLICT = gql`
      mutation insertProjectWithOnConflict($objects: [projects_insert_input!]!, $onConflict: projects_on_conflict) {
        insert_projects(objects: $objects, on_conflict: $onConflict) {
          affected_rows
          returning {
            ...Project
          }
        }
      }
      ${ProjectFragmentDoc}
    `;


    // Mutation: Update by Id
    //

    const UPDATE_PROJECT_BYID = gql`
      mutation updateProjectById($id: uuid, $set: projects_set_input) {
        update_projects(_set: $set, where: { id: { _eq: $id } }) {
          affected_rows
          returning {
            ...Project
          }
        }
      }
      ${ProjectFragmentDoc}
    `;


    // Mutation: Update
    //

    const UPDATE_PROJECTS = gql`
      mutation updateProject($set: projects_set_input, $where:projects_bool_exp!) {
        update_projects(_set: $set, where: $where) {
          affected_rows
          returning {
            ...Project
          }
        }
      }
      ${ProjectFragmentDoc}
    `;


    // Mutation: Remove by Id
    //

    const REMOVE_PROJECTSMODEL_BYID = gql`
      mutation removeProjectsModelById($id: uuid) {
        delete_projects(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `;


    // Mutation: Remove
    //

    const REMOVE_PROJECTSMODELS = gql`
      mutation removeProjectsModel($where:projects_bool_exp!) {
        delete_projects(where: $where) {
          affected_rows
        }
      }
    `;

    // ProjectExplore GQL
    //------------------------------------------------ 
  


    // Query: FetchById
    //
    const QUERY_PROJECTEXPLORE_BYID = gql`
  query queryProjectExploreById($projectsId: uuid!) {
    projects_by_pk(id: $projectsId) {
      ...ProjectExplore
    }
  }
  ${ProjectExploreFragmentDoc}`;


    // Query: Fetch
    //
    const QUERY_PROJECTEXPLORE_OBJECTS = gql`
  query queryProjectExploreObjects(
    $distinct_on: [projects_select_column!]
    $where: projects_bool_exp
    $limit: Int
    $offset: Int
    $order_by: [projects_order_by!]
  ) {
    projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...ProjectExplore
    }
  }
  ${ProjectExploreFragmentDoc}
  `;


    // Subscription: FetchById
    //
    const SUBSCRIBE_TO_PROJECTEXPLORE_BYID = gql`
  subscription subscribeToProjectExploreById($projectsId: uuid!) {
    projects_by_pk(id: $projectsId) {
      ...ProjectExplore
    }
  }
  ${ProjectExploreFragmentDoc}`;


    // Subscription: Fetch
    //
    const SUBSCRIBE_TO_PROJECTEXPLORE_OBJECTS = gql`
  subscription subscribeToProjectExploreObjects(
    $distinct_on: [projects_select_column!]
    $where: projects_bool_exp
    $limit: Int
    $offset: Int
    $order_by: [projects_order_by!]
  ) {
    projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...ProjectExplore
    }
  }
  ${ProjectExploreFragmentDoc}
  `;


    // Mutation: Insert
    //

    const INSERT_PROJECTEXPLORE = gql`
      mutation insertProjectExplore($objects: [projects_insert_input!]!) {
        insert_projects(objects: $objects) {
          affected_rows
          returning {
            ...ProjectExplore
          }
        }
      }
      ${ProjectExploreFragmentDoc}
    `;


    // Mutation: Insert
    //

    const INSERT_PROJECTEXPLORE_WITH_ONCONFLICT = gql`
      mutation insertProjectExploreWithOnConflict($objects: [projects_insert_input!]!, $onConflict: projects_on_conflict) {
        insert_projects(objects: $objects, on_conflict: $onConflict) {
          affected_rows
          returning {
            ...ProjectExplore
          }
        }
      }
      ${ProjectExploreFragmentDoc}
    `;


    // Mutation: Update by Id
    //

    const UPDATE_PROJECTEXPLORE_BYID = gql`
      mutation updateProjectExploreById($id: uuid, $set: projects_set_input) {
        update_projects(_set: $set, where: { id: { _eq: $id } }) {
          affected_rows
          returning {
            ...ProjectExplore
          }
        }
      }
      ${ProjectExploreFragmentDoc}
    `;


    // Mutation: Update
    //

    const UPDATE_PROJECTEXPLORES = gql`
      mutation updateProjectExplore($set: projects_set_input, $where:projects_bool_exp!) {
        update_projects(_set: $set, where: $where) {
          affected_rows
          returning {
            ...ProjectExplore
          }
        }
      }
      ${ProjectExploreFragmentDoc}
    `;