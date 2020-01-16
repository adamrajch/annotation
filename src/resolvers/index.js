import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Book from "./Book";
import Annotation from "./Annotation";
import Group from "./Group";
import Subscription from "./Subscription";
import { extractFragmentReplacements } from "prisma-binding";
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Book,
  Group,
  Annotation,
  User
};

const fragmentReplacements = extractFragmentReplacements(resolvers);
export { resolvers, fragmentReplacements };
