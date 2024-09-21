import { gql } from "@apollo/client"

export const getAuthFormRequestGlobalTokenCodeMutation = () => gql`
	mutation AuthFormRequestGlobalTokenCodeMutation($input: RequestGlobalTokenInput!) {
			requestGlobalTokenCode(input: $input) {
				status
		}
	}
`

export const getAuthSignInMutation = () => gql`
	mutation AuthSignInMutation($input: AuthSignInMutationInput!) {
		authSignInMutation(input: $input)
		@rest(type: "Auth", method: "POST", path: "/auth/signin")
		{
			message
		}
	}
`

export const getAuthFormValidateEmailMutation = () => gql`
	mutation AuthFormValidateEmailMutation(
		$input: RequestGlobalTokenInput!\n) {
			validateEmail(input: $input) {
				valid
				suggestion
			}
	}
`

export const getAddReaction = () => gql`
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      status
    }
  }
`

export const getRemoveReaction = () => gql`
  mutation removeReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`
