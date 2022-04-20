import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const DB = [
	{ id: 1, title: "test1", year: 2000 },
	{ id: 2, title: "test2", year: 2010 },
	{ id: 3, title: "test3", year: 2020 },
];

const typeDefs = gql`
	type Movie {
		title: String
		year: Int
	}
	type Query {
		movies: [Movie]
		movie(id: Int!): Movie
	}
`;

const resolvers = {
	Query: {
		movies: () => [...DB],
		movie: (_, { id }) => {
			const movieData = DB.filter((movie) => {
				if (movie.id === id) {
					return movie;
				}
			});
			console.log(...movieData);
			return movieData[0];
		},
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
