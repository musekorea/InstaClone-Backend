import jwt from "jsonwebtoken";
import client from "../../client";

export const getUser = async (token) => {
	try {
		console.log(token);
		const id = jwt.verify(token, process.env.TOKEN_SECRET_KEY).id;
		const loginUser = await client.user.findUnique({ where: { id } });
		if (loginUser) {
			return loginUser;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const protectResolver = (resolver) => (_, args, context, info) => {
	if (!context.loginUser) {
		return { success: false, error: "Need to login" };
	} else {
		return resolver(_, args, context, info);
	}
};
