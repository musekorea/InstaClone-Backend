import jwt from "jsonwebtoken";
import client from "../../client";

export const getUser = async (token) => {
	try {
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

export const protectResolver = (loginUser) => {
	if (!loginUser) {
		return { success: false, error: "You need to login first" };
	}
};
