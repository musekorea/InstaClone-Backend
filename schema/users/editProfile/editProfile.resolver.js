import client from "../../../client";
import bcrypt from "bcrypt";

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, userName, email, password },
			{ loginUser, protectResolver }
		) => {
			try {
				console.log(loginUser);
				protectResolver(loginUser);
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
		},
	},
};
