import mongoose from 'mongoose';

const schema = mongoose.Schema;

const ingredientSchema = new schema(
  {
    name: {
      type: String,
      required: true
    },
    recetas: [{
      type: schema.Types.ObjectId,
      ref: 'receta'
    }],
    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

export default ingredientSchema;
