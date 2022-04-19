const { ApolloServer, gql } = require("apollo-server");
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		hello: () => "HI",
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(() => {
	console.log("Server is running on PORT 4000");
});
