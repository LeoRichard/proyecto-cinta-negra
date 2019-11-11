import {
  addUserAction,
  updateUserAction,
  deleteUserAction,
  doLoginAction,
  getAllUsersAction,
  addFavoriteAction
} from './actions/usersActions';

import {
  addRecetaAction,
  updateRecetaAction,
  getAllRecetasAction,
  getRecetaAction,
  deleteRecetaAction,
  addIngredientToRecetaAction
} from './actions/recetasActions';

import {
  addIngredientAction,
  updateIngredientAction,
  deleteIngredientAction,
  getAllIngredientsAction
} from './actions/ingredientsActions';

import { storeUpload } from '../graphql/actions/utils/uploader';

const resolvers = {
  Query: {
    ingredients: async (parent, data, context, info) => {
      try {
        return await getAllIngredientsAction();
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    getAllRecetas: async (parent, data, context, info) => {
      try {
        return await getAllRecetasAction();
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    users: () => getAllUsersAction()
  },
  Mutation: {
    addUser: async (parent, data, context, info) => {
      try {
        // sube el archivo
        //const { createReadStream } = await data.data.profileImage;
        //const stream = createReadStream();
        //const { url } = await storeUpload(stream, 'image');

        // registra usario
        const userInfo = {
          ...data.data,
          profileImage: null,
        };

        return await addUserAction(userInfo);
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
    deleteUser: async (parent, data, context, info) => {
      try {
        const { userID } = data;
        return await deleteUserAction(userID);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addIngredient: async (parent, data, context, info) => {
      try {
        const { ingredientInfo, recetaID } = data;
        const newIngredient = await addIngredientAction(ingredientInfo, recetaID);
        console.log("TCL: newIngredient", newIngredient);
        return newIngredient;
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    deleteIngredient: async (parent, data, context, info) => {
      try {
        const { ingredientID } = data;
        console.log("Ingredient Deleted.");
        return await deleteIngredientAction(ingredientID);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addIngredientToReceta: async (parent, data, context, info) => {
      try {
        const { ingredientID, recetaID } = data;
        return await addIngredientToRecetaAction(ingredientID, recetaID);
      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    addFavorite: async (parent, data, context, info) => {
      try {
        const { recetaID } = data;
        const { user } = context;
        return await addFavoriteAction(user, recetaID);

      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    removeFavorite: async (parent, data, context, info) => {
      try {
        const { recetaID } = data;
        const { user } = context;
        const filter = { _id: user._id };
        const update = { $pull: { 'favorites': recetaID } };
        console.log("Favorite removed from user: " + user.name);
        return await updateUserAction(filter, update);

      } catch (error) {
        console.log("TCL: error", error);
      }
    },
    deleteReceta: async (parent, data, context, info) => {
      try {
        const { recetaID } = data;
        console.log("Receta Deleted.");
        return await deleteRecetaAction(recetaID);
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
