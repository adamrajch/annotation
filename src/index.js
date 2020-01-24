import '@babel/polyfill'
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

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log("the server is up!");
});
