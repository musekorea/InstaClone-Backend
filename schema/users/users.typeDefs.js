import { gql } from "apollo-server";

export default gql`
	type User {
		id: Int!
		firstName: String!
		lastName: String!
		userName: String!
		email: String!
		#password: String
		createdAt: String
		updatedAt: String
	}
	type LoginResult {
		success: Boolean!
		token: String
		error: String
	}

	type Query {
		seeProfile(userName: String!): User
	}
	type Mutation {
		createAccount(
			firstName: String!
			lastName: String!
			userName: String!
			email: String!
			password: String!
		): User
		login(userName: String!, password: String!): LoginResult
	}
`;
