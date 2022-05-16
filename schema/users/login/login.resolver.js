import bcrypt from "bcrypt";
import client from "../../../client";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		login: async (_, { userName, password }) => {
			try {
				const user = await client.user.findUnique({ where: { userName } });
				if (!user) {
					return { success: false, error: "User not found" };
				}
				const passwordCheck = await bcrypt.compare(password, user.password);
				if (!passwordCheck) {
					return { success: false, error: "Incorrect Password" };
				}
				const token = jwt.sign(
					{ id: user.id, test: "This is test token" },
					process.env.TOKEN_SECRET_KEY
				);
				console.log(token);
				return {
					success: true,
					token: token,
				};
			} catch (error) {
				console.log(error);
			}
		},
	},
};
