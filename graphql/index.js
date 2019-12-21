import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import * as database from "./database/database.js";
import resolvers from "./resolvers.js";
import context from "./contexts/context.js";
import typeDefs from "./type-defs.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
});

const main = async () => {
    dotenv.config();
    await database.connect();
    await server.listen({
        tracing: true,
        port: 4000,
        path: "/"
    });
    console.info("Started GraphQL server on port 4000");
};

main();