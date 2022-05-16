import client from "../../../client";

export default {
	Query: {
		seeProfile: async (_, { userName, email }) => {
			try {
				const user = await client.user.findUnique({
					where: { userName, email },
				});
				console.log(user);
				return user;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
