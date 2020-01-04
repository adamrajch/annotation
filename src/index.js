import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import AniList from "./resolvers/AniList";
import Show from "./resolvers/Show";
import Subscription from "./resolvers/Subscription";
import "./prisma";
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    AniList,
    Show
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("the server is up!");
});
