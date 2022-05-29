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
		bio: String
		avatar: String
	}
`;
