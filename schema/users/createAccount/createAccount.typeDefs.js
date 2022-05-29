import { gql } from "apollo-server";

export default gql`
	type CreateAccountResult {
		success: Boolean!
		error: String
	}
	type Mutation {
		createAccount(
			firstName: String!
			lastName: String!
			userName: String!
			email: String!
			password: String!
			bio: String
		): CreateAccountResult
	}
`;
