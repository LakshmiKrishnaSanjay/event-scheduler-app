require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const connectDB = require('./db');

const startServer = async () => {
  try {
    const db = await connectDB(); // ✅ Connect once
    

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        db, // ✅ Use the same db instance here
      }),
    });

    const { url } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`✅ MongoDB connected`);
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();
