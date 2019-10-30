import {
  addUserAction,
  updateUserAction,
  doLoginAction,
  getAllUsersAction
} from './actions/usersActions';

import {
  addRecetaAction,
  updateRecetaAction,
  getAllRecetasAction
} from './actions/recetasActions';

import {
  addIngredientAction,
  updateIngredientAction,
  getAllIngredientsAction
} from './actions/ingredientsActions';

const resolvers = {
  Query: {
    ingredients: () => getAllIngredientsAction(),
    recetas: () => getAllRecetasAction(),
    users: () => getAllUsersAction()
  },
  Mutation: {
    addUser: async (parent, data, context, info) => {
      try {
        return await addUserAction(data.data);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addReceta: async (parent, data, context, info) => {
      try {
        const { user } = context;
        const { recetaInfo, ingredientID } = data;
        const newReceta = await addRecetaAction(recetaInfo);
        const filter = { _id: ingredientID };
        const filterReceta = { _id: newReceta._id };
        const filterUser = {_id: user._id};
        const update = { $push: { 'recetas': newReceta._id } };
        const updateUser = { $push: { 'recetas': newReceta._id } };
        const updateReceta = { $push: { 'ingredients': ingredientID } };
        await updateIngredientAction(filter, update);
        await updateRecetaAction(filterReceta, updateReceta);
        await updateUserAction(filterUser, updateUser);
        return newReceta;
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addIngredient: async (parent, data, context, info) => {
      try {
        const newData = await RecetaModel.create(data.data);
        console.log("TCL: newData", newData);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addFavorite: async (parent, data, context, info) => {
      try {
        const { recetaID } = data;
        const { user } = context;
        const filter = { _id: user._id };
        const update = { $push: { 'favorites': recetaID } };
        return await updateUserAction(filter, update);

      } catch (error) {
        console.log("TCL: error", error);
      }
    },

    doLogin: async (parent, data, context, info) => {
      try {
        const { userName, password } = data;
        return await doLoginAction(userName, password);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
  }
};

export default resolvers;
