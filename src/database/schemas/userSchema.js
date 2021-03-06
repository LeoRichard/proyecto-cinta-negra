import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['H', 'M']
    },
    password: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      default: 'https://res.cloudinary.com/richardleodevf/image/upload/v1573673635/user-image-png_deh9zl.png'
    },
    favorites: [{
      type: schema.Types.ObjectId,
      ref: 'receta'
    }],
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

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

export default userSchema;
