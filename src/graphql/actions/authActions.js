import jwt from 'jsonwebtoken';

import { findUserAction } from './usersActions';

import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const ctx = args[2];
      if (ctx.user) {
        return await resolve.apply(this, args);
      } else {
        throw new AuthenticationError("necesitas estar estar logueado para hacer esto");
      }
    };
  }
}

const getContext = (req) => {
  try {
    const token = req.headers.authorization;
    if (typeof token === typeof undefined) return req;

    return jwt.verify(
      token,
      process.env.JWT,
      async function (error, result) {
        if (error) return req;
        try {
          const user = await findUserAction({ _id: result._id });
          return { ...req, user };
        } catch (error) {
          return req;
        }
      });
  } catch (error) {
    return req;
  }
};

export {
  getContext,
  AuthDirective
};
