import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ firstName, lastName, userName, email, password }
		) => {
			try {
				const existUser = await client.user.findFirst({
					where: { OR: [{ userName }, { email }] },
				});
				console.log(existUser);
				if (existUser) {
					throw new Error("This username or email is already taken ✋");
				}
				const hashedPassword = await bcrypt.hash(password, 10);
				const user = await client.user.create({
					data: {
						firstName,
						lastName,
						userName,
						email,
						password: hashedPassword,
					},
				});
				return user;
			} catch (error) {
				console.log(error);
			}
		},
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
			} catch (error) {
				console.log(error);
			}
		},
	},
};
