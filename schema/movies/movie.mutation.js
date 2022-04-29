import client from "../../client";

export default {
	Mutation: {
		createMovie: (_, { title, year, genre }) =>
			client.Movies.create({
				data: { title, year, genre },
			}),
		deleteMovie: (_, { id }) => client.movies.delete({ where: { id } }),
		updateMovie: (_, { id, year }) =>
			client.movies.update({ where: { id }, data: { year } }),
	},
};
