import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const client = new PrismaClient();

const typeDefs = gql`
	type Movie {
		id: Int!
		title: String!
		year: Int!
		genre: String
		createdAt: String!
		updatedAt: String!
	}
	type Query {
		movies: [Movie]
	}
	type Mutation {
		createMovie(title: String!, year: Int!, genre: String): Movie
	}
`;

const resolvers = {
	Query: {
		movies: () => client.Movies.findMany(),
	},
	Mutation: {
		createMovie: (_, { title, year, genre }) =>
			client.Movies.create({
				data: { title, year, genre },
			}),
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
