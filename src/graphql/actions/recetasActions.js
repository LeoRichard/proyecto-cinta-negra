import { RecetaModel } from '../../database/models';

const addRecetaAction = async (recetaData) => {
  try {
    return await RecetaModel.create(recetaData)
  } catch (error) {
    console.log("TCL: error", error)
  }
};

const updateRecetaAction = async (filter, update) => {
  try {
    return await RecetaModel.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    console.log("TCL: updateRecetaAction -> error", error)
  }
}

export {
  addRecetaAction,
  updateRecetaAction
}
