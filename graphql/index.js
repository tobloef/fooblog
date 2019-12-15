import resolvers from "./resolvers.js";
import {GraphQLServer} from "graphql-yoga";
import dotenv from "dotenv";
import * as database from "./database/database.js";

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers
});

const main = async () => {
    dotenv.config();
    await database.connect();
    await server.start();
    console.info("Started GraphQL server on port 4000");
};

main();