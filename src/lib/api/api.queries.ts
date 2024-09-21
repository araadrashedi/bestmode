import { gql } from "@apollo/client"

export type GetPostResponse = {
	post: Post
}

export const getGetPostQuery = () => gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      slug
      fields {
        key
        value
        relationEntities {
          __typename
          medias {
            __typename
            ... on Image {
              __typename
              dominantColorHex
              id
              url
              urls {
                __typename
                full
                large
                medium
                small
                thumb
              }
            }
          }
        }
      }
      reactionsCount
      hasMoreContent
      shortContent
      createdAt
      publishedAt
      createdById
      spaceId
      title
      description
      textContent
      owner {
        __typename
        member {
          displayName
          name
          id
          username
        }
      }
      reactions {
        count
        reacted
        reaction
      }
    }
  }
`

export type GetPostsResponse = {
	posts: {
		nodes: Post[]
		pageInfo: {
			endCursor: Maybe<string>
			hasNextPage: boolean
			__typename: "PageInfo"
		}
		totalCount: number
		__typename: "PaginatedPost"
	}
}

export const getGetPostsQuery = () => gql`
	query GetPosts($after: String, $before: String, $excludePins: Boolean, $filterBy: [PostListFilterByInput!], $limit: Int!, $offset: Int, $orderBy: PostListOrderByEnum, $orderByString: String, $postTypeIds: [String!], $reverse: Boolean, $spaceIds: [ID!], $query: String) {
		posts(
			after: $after
			before: $before
			excludePins: $excludePins
			filterBy: $filterBy
			limit: $limit
			offset: $offset
			orderBy: $orderBy
			orderByString: $orderByString
			postTypeIds: $postTypeIds
			reverse: $reverse
			spaceIds: $spaceIds
			query: $query
		) {
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
			nodes {
				id
				slug
	      fields {
	        key
	        value
	        relationEntities {
	          __typename
	          medias {
	            __typename
	            ... on Image {
	              __typename
	              dominantColorHex
	              id
	              url
	              urls {
	                __typename
	                full
	                large
	                medium
	                small
	                thumb
	              }
	            }
	          }
	        }
	      }
				reactionsCount
				hasMoreContent
				shortContent
				createdAt
				publishedAt
				createdById
				spaceId
				title
				description
				textContent
				owner {
					__typename
					member {
						isAuthenticated @client
						displayName
						name
						id
						username
					}
				}
				reactions {
					count
					reacted
					reaction
				}
			}
		}
	}
`
