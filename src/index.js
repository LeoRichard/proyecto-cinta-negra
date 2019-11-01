import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import {
  getContext,
  AuthDirective
} from './graphql/actions/authActions';

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    AuthDirective: AuthDirective
  },
  context: async ({ req }) => getContext(req),
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
