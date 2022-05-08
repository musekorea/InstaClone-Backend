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
 type Query {
   
 }
	type Mutation {
		createAccount(
			firstName: String!
			lastName: String!
			userName: String!
			email: String!
			password: String!
		): User
	}
`;
