import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/schema/**/*.typeDefs.js`);
export const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(`${__dirname}/schema/**/*.resolver.js`);
export const resolvers = mergeResolvers(loadedResolvers);
