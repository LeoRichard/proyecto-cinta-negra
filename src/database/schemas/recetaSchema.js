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
    content: {
      type: String,
      required: true
    },
    ingredients: [{
      type: schema.Types.ObjectId,
      ref: 'ingredient'
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    author: [{
      type: schema.Types.ObjectId,
      ref: 'user'
    }],
    featuredImage: {
      type: String,
      default: 'https://res.cloudinary.com/richardleodevf/image/upload/v1573836407/1380556266799_d3z2fu.jpg'
    },
  },
  { timestamps: true }
);

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

export default recetaSchema;
