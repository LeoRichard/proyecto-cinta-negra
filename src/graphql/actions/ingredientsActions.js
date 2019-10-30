import { IngredientModel } from '../../database/models';

const addIngredientAction = async (ingredientData) => {
  try {
    return await IngredientModel.create(ingredientData);
  } catch (error) {
    console.log("TCL: error", error)
  }
};

const updateIngredientAction = async (filter, update) => {
  try {
    return await IngredientModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    console.log("TCL: updateIngredientAction -> error", error);
  }
};

const getAllIngredientsAction = async () => {
  try {
    return await IngredientModel.find().populate('recetas');
  } catch (error) {
    console.log("TCL: getAllIngredientsAction -> error", error);
  }
};

export {
  addIngredientAction,
  updateIngredientAction,
  getAllIngredientsAction
};
