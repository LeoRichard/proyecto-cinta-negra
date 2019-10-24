import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';

const url = process.env.DATA_BASE;

mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "Error de conexion!"));
mongoDB.on('open', () => console.log('Bd conectada'));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
