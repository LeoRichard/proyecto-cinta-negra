import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';
import ingredientSchema from '../schemas/ingredientSchema';

const UserModel = mongoose.model('user', userSchema);
const IngredientModel = mongoose.model('ingredient', ingredientSchema);

export {
  UserModel,
  IngredientModel
}
