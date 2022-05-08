import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(`${__dirname}/schema/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(
	`${__dirname}/schema/**/*.{query,mutation}.js`
);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
