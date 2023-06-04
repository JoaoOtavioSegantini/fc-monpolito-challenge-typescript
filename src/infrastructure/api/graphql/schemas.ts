import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

import path from "path";

const mergePath = loadFilesSync(
  path.join(process.cwd(), "src/modules/**/graphql/*.gql")
);

const schemas = mergeTypeDefs(mergePath);

export default schemas;
