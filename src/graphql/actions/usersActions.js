import jwt from 'jsonwebtoken';
import { UserModel } from '../../database/models';
import bcrypt from 'bcrypt';
import { isRecetaActive } from './recetasActions';

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const createToken = (userData) => {
  const exp = new Date().addDays(5).getTime();
  const payload = {
    _id: userData.id,
    email: userData.email,
    name: userData.name,
    exp,
  };

  const token = jwt.sign(payload, process.env.JWT);
  return token;
};

const addUserAction = async (userData) => {
  try {
    const newUser = await UserModel.create(userData);
    const token = createToken(newUser);
    console.log("User " + newUser.name + " created.");
    return { token };
  } catch (error) {
    console.log("TCL: addUserAction -> error", error);
  }
};

const getAllUsersAction = async () => {
  try {
    return await UserModel.find().populate({
      path: 'favorites',
      populate: {
       path: 'ingredients'
     }
   }).populate({ path: 'recetas' });
  } catch (error) {
    console.log("TCL: getAllUsersAction -> error", error);
  }
};

const getUserRecetasAction = async (user) => {
  try {
    return await UserModel.findById(user._id).populate('recetas').populate('favorites');
  } catch (error) {
    console.log("TCL: getUserRecetasAction -> error", error)
  }
};

const findUserAction = async (filter) => {
  try {
    return await UserModel.findOne(filter);
  } catch (error) {
    console.log("TCL: findUserAction -> error", error);
  }
};

const updateUserAction = async (filter, update) => {
  try {
    return await UserModel.findOneAndUpdate(filter, update, { new: true }).populate('favorites');
  } catch (error) {
    console.log("TCL: updateUserAction -> error", error);
  }
};

const deleteUserAction = async (userID) => {
  try {
    const filter = { _id: userID };
    const update = { $set: { isActive: false } };
    console.log("Usuario borrado.");
    return await updateUserAction(filter, update);
  } catch (error) {
    console.log("TCL: deleteUserAction -> error", error);
  }
};

const doLoginAction = async (userName, password) => {
  try {
    const filter = { email: userName };
    const currentUser = await findUserAction(filter);
    console.log("User " + currentUser.name +" logged.");
    const validLogin = await bcrypt.compare(password, currentUser.password);
    if (validLogin) {
      const token = createToken(currentUser);
      return { token };
    }

    return null;
  } catch (error) {
    console.log("TCL: doLoginAction -> error", error);
  }
};

const addFavoriteAction = async (user, recetaID) => {
  try {
    const isActive = await isRecetaActive(recetaID);

    if(isActive) {
      const filter = { _id: user._id };
      const update = { $push: { 'favorites': recetaID } };
      console.log("Favorite added to user: " + user.name);
      return await updateUserAction(filter, update);
    } else {
      console.log("Favorite not added: Receta is not active.");
      return;
    }
  } catch (error) {
    console.log("TCL: addFavoriteAction -> error", error);
  }
};

export {
  addUserAction,
  updateUserAction,
  deleteUserAction,
  findUserAction,
  getAllUsersAction,
  doLoginAction,
  addFavoriteAction,
  getUserRecetasAction
};
