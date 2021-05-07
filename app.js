const express = require("express");
const { ApolloServer, gql, ApolloError } = require("apollo-server-express");
const { VehicleResolver } = require("./resolvers");

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type VehicleStatus {
      bike_id: ID
      lat: String
      lon: String
      is_reserved: String
      is_disabled: String
      vehicle_type: String
    }
    type Query {
      Vehicle(id: ID): [VehicleStatus]
    }
  `;

  // Provide resolver functions for your schema fields

  const resolvers = {
    Query: {
      Vehicle: VehicleResolver,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const authHeader = req.headers.authorization || "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
        //authenticate token
      } else {
        //   throw new ApolloError("Unauthorize")
      }
    },
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4020 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
