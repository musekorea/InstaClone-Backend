import client from "../../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
export default {
	Upload: GraphQLUpload,
	Mutation: {
		editProfile: protectResolver(
			async (
				_,
				{ firstName, lastName, userName, email, password, bio, avatar },
				{ loginUser }
			) => {
				try {
					console.log("test", avatar);
					let hashedPassword = null;
					if (password) {
						hashedPassword = await bcrypt.hash(password, 10);
					}
					const updateUser = await client.user.update({
						where: { id: loginUser.id },
						data: {
							firstName,
							lastName,
							userName,
							email,
							password: hashedPassword ? hashedPassword : password,
							bio,
						},
					});
					if (updateUser) {
						return {
							success: true,
						};
					} else {
						return {
							success: false,
							error: "Sorry, could not update profile",
						};
					}
				} catch (error) {
					console.log(error);
				}
			}
		),
	},
};
