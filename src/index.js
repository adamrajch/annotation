import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import prisma from "./prisma";
import { resolvers, fragmentReplacements } from "./resolvers/index";
// const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/annotationschema.graphql",
  resolvers,
  context(request) {
    return {
      db,
      prisma,
      request
    };
  },
  fragmentReplacements
});

server.start(() => {
  console.log("the server is up!");
});
