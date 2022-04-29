import client from "../../client.js";

export default {
	Query: {
		movies: () => client.Movies.findMany(),
		movie: (_, { id }) => client.movies.findUnique({ where: { id } }),
	},
};
