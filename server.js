import "dotenv/config";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./graphql_shcema";

const PORT = process.env.PORT;

const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(PORT).then(() => {
	console.log(`Server is running on PORT ${PORT}`);
});
