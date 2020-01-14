import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Book from "./resolvers/Book";
import Annotation from "./resolvers/Annotation";
import Group from "./resolvers/Group";
import Subscription from "./resolvers/Subscription";
import prisma from "./prisma";
// const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/annotationschema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Book,
    Group,
    Annotation,
    User
  },
  context(request) {
    return {
      db,
      // pubsub,
      prisma,
      request
    };
  }
});

server.start(() => {
  console.log("the server is up!");
});
