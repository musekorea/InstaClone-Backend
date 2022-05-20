import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./graphql_schema";
import jwt from "jsonwebtoken";
import { getUser } from "./schema/users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
	schema,
	context: async ({ req, _ }) => {
		const token = req.headers.token;
		if (!token) {
			return { currentUser: null };
		} else {
			return { currentUser: await getUser(token) };
		}
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(PORT).then(() => {
	console.log(`Server is running on PORT ${PORT}`);
});
