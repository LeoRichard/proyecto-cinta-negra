import { UserModel, IngredientModel } from '../dataBase/models';

const ingredients = [
  {
    name: "Ajo"
  },
  {
    name: "Perejil"
  },
  {
    name: "Pollo"
  }
];

const recetas = [{
  name: "Pollo al horno",
  ingredients: ingredients,
  difficulty: "Easy"
}];

const resolvers = {
  Query: {
    ingredients: () => ingredients,
    recetas: () => recetas
  },
  Mutation: {
    addUser: async (parent, data, context, info) => {
      try {
        const newData = await UserModel.create(data.data)
        console.log("TCL: newData", newData)
      } catch (error) {
        console.log("TCL: error", error)
      }
    },
    addIngredient: async (parent, data, context, info) => {
      try {
        const newData = await IngredientModel.create(data.data)
        console.log("TCL: newData", newData)
      } catch (error) {
        console.log("TCL: error", error)
      }
    }
  }
};

export default resolvers;
