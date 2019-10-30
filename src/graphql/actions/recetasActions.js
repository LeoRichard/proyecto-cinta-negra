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

export {
  addRecetaAction,
  updateRecetaAction,
  getAllRecetasAction
};
