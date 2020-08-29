import gql from 'graphql-tag'

export const ProjectFragmentDoc = gql`
  fragment Project on projects {
    id
    name
    description
    project_type
    annotator_per_example
    collaborative_annotation
    randomize_document_order
    updated_at
    guideline
    is_public
  }
`

export const ProjectExploreFragmentDoc = gql`
  fragment ProjectExplore on projects {
    ...Project
    project_notifications {
      addition_data
      created_at
      id
      notification_type
      sender_id
    }
    project_contributors_aggregate {
      aggregate {
        count
      }
    }
    labels_aggregate {
      aggregate {
        count
      }
    }
    documents_aggregate {
      aggregate {
        count
      }
      nodes {
        task_distributions {
          is_approved
        }
      }
    }
  }
`
