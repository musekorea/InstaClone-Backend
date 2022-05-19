import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./graphql_schema";

const PORT = process.env.PORT;

const server = new ApolloServer({
	schema,
	context: ({ req, _ }) => {
		console.log(req.headers.token);
		return {
			token: req.headers.token,
		};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(PORT).then(() => {
	console.log(`Server is running on PORT ${PORT}`);
});
