import mongoose from 'mongoose';

const schema = mongoose.Schema;

const ingredientSchema = new schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default ingredientSchema;
