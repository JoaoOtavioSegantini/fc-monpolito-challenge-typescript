import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const mergePath = loadFilesSync(
  path.join(process.cwd(), "src/modules/**/graphql/*.resolvers.ts")
);

const resolvers = mergeResolvers(mergePath);

export default resolvers;
