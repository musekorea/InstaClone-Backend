import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";

import { typeDefs, resolvers } from "./graphql_schema";
import { getUser, protectResolver } from "./schema/users/users.utils";

const PORT = process.env.PORT;
const app = express();

const startApolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		context: async ({ req, _ }) => {
			const token = req.headers.token;
			if (!token) {
				return { loginUser: null, protectResolver };
			} else {
				return { loginUser: await getUser(token), protectResolver };
			}
		},
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise((resolve) => app.listen(PORT, resolve)).then(() =>
		console.log(
			`Server is running on http://localhost:${PORT}${server.graphqlPath}`
		)
	);
};
startApolloServer();
