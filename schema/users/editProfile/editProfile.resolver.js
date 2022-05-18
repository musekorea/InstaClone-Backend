import client from "../../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, userName, email, password, token }
		) => {
			try {
				const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
				console.log(decodedToken);
				let hashedPassword = null;
				if (password) {
					hashedPassword = await bcrypt.hash(password, 10);
				}
				const updateUser = await client.user.update({
					where: { id: decodedToken.id },
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
