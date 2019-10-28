import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import recetaSchema from '../schemas/recetaSchema';
import ingredientSchema from '../schemas/ingredientSchema';

const UserModel = mongoose.model('user', userSchema);
const RecetaModel = mongoose.model('receta', recetaSchema);
const IngredientModel = mongoose.model('ingredient', ingredientSchema);

export {
  UserModel,
  IngredientModel,
  RecetaModel
};
