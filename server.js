import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

let DB = [
	{ id: 1, title: "test1", year: 2000 },
	{ id: 2, title: "test2", year: 2010 },
	{ id: 3, title: "test3", year: 2020 },
];

const typeDefs = gql`
	type Movie {
		id: Int!
		title: String!
		year: Int!
	}
	type Query {
		movies: [Movie]
		movie(id: Int!): Movie
	}
	type Mutation {
		createMovie(id: Int!, title: String, year: Int!): Boolean
		deleteMovie(id: Int!): Boolean
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
			return movieData[0];
		},
	},
	Mutation: {
		createMovie: (_, { id, title, year }) => {
			const newMovie = { id, title, year };
			DB = [...DB, newMovie];
			console.log(DB);
			return true;
		},
		deleteMovie: (_, { id }) => {
			DB = DB.filter((movie) => {
				if (movie.id !== id) {
					return movie;
				}
			});
			console.log(DB);
			return true;
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
