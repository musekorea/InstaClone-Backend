import { gql } from "apollo-server";

export default gql`
	type EditProfileResult {
		success: Boolean!
		error: String
	}
	type Mutation {
		editProfile(
			firstName: String
			lastName: String
			userName: String
			email: String
			password: String
			token: String!
		): EditProfileResult
	}
`;
