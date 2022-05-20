import jwt from "jsonwebtoken";
import client from "../../client";

export const getUser = async (token) => {
	try {
		const id = jwt.verify(token, process.env.TOKEN_SECRET_KEY).id;
		const currentUser = await client.user.findUnique({ where: { id } });
		if (currentUser) {
			return currentUser;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};
