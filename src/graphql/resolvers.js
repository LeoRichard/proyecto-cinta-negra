import {
  addUserAction,
  updateUserAction
} from './actions/usersActions';

import {
  addRecetaAction,
  updateRecetaAction
} from './actions/recetasActions';

import {
  addIngredientAction,
  updateIngredientAction
} from './actions/ingredientsActions';

const resolvers = {
  Query: {
    ingredients: () => ingredients,
    recetas: () => recetas
  },
  Mutation: {
    addUser: async (parent, data, context, info) => {
      try {
        return await addUserAction(data.data);
      } catch (error) {
        console.log("TCL: error", error)
      }
    },
    addReceta: async (parent, data, context, info) => {
      try {
        const { recetaInfo, ingredientID } = data;
        const newReceta = await addRecetaAction(recetaInfo);
        const filter = { _id: ingredientID };
        const update = { $push: { 'recetas': newReceta._id } };
        await updateIngredientAction(filter, update);
        return newReceta;
      } catch (error) {

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
  }
};

export default resolvers;
