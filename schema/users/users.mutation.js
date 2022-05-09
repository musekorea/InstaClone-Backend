import client from "../../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ firstName, lastName, userName, email, password }
		) => {
			const existUser = await client.user.findFirst({
				where: { OR: [{ userName }, { email }] },
			});
			console.log(existUser);
		},
	},
};
