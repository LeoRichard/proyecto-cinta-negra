import mongoose from 'mongoose';

const schema = mongoose.Schema;

const recetaSchema = new schema(
  {
    name: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    ingredients: [{
      type: schema.Types.ObjectId,
      ref: 'ingredients'
    }]
  },
  { timestamps: true }
);

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

export default recetaSchema;
