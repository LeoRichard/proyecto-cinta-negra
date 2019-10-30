import { RecetaModel } from '../../database/models';

const addRecetaAction = async (recetaData) => {
  try {
    console.log("Receta creada");
    return await RecetaModel.create(recetaData);
  } catch (error) {
    console.log("TCL: error", error);
  }
};

const updateRecetaAction = async (filter, update) => {
  try {
    return await RecetaModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    console.log("TCL: updateRecetaAction -> error", error);
  }
};

const getAllRecetasAction = async () => {
  try {
    return await RecetaModel.find().populate('ingredients');
  } catch (error) {
    console.log("TCL: getAllRecetasAction -> error", error);
  }
};

const getRecetaAction = async (recetaID) => {
  try {
    return await RecetaModel.findOne({ _id: recetaID });
  } catch (error) {
    console.log("TCL: getAllRecetasAction -> error", error);
  }
};

const deleteRecetaAction = async (recetaID) => {
  try {
    const filter = { _id: recetaID };
    const update = { $set: { isActive: false } };
    return await updateRecetaAction(filter, update);
  } catch (error) {
    console.log("TCL: deleteRecetaAction -> error", error);
  }
};

const isRecetaActive = async (recetaID) => {
  try {
    const receta = await RecetaModel.findOne({ _id: recetaID });
    if (receta.isActive) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("TCL: isRecetaActive -> error", error);
  }
};

export {
  addRecetaAction,
  updateRecetaAction,
  getAllRecetasAction,
  getRecetaAction,
  isRecetaActive,
  deleteRecetaAction
};
