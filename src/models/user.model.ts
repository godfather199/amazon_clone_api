import {Schema, model} from 'mongoose'
import mongoose from 'mongoose';
import { UserDocument, UserModel, UserType } from '../types/user.type'
import validator from 'validator';
import bcrypt from 'bcryptjs'
import { HttpException } from '../exceptions/exception';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from '../constants/constant';


const {ObjectId} = Schema.Types


const userSchema = new Schema<UserDocument, UserModel>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.passwordError
        );
      }
    },
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.invalidEmail
        );
      }
    },
  },
  profilePicture: {
    public_Id: {
        type: String
    },
    url: {
        type: String
    },
  },
  products_Selling: [
    {
      productId:{
        type: ObjectId,
        ref: 'product',
        required: true
      }
    }
  ],
  phoneNumber: {
    type: Number
  },
  address: {
    house_no: String,
    city: String,
    state: String,
    country: String
  },
  cart: {
    type: ObjectId,
    ref: "cart",
  },
  orders: [
    {
      orderId: {
        type: ObjectId,
        ref: 'order',
        required: true
      }
    }
  ],
  whishlist: [
    {
      productId: {
        type: ObjectId,
        ref: 'product',
        required: true
      },
    }
  ],
},
{
    timestamps: true
});





userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: mongoose.Types.ObjectId
): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};



userSchema.statics.isUsernameTaken = async function (
  username: string,
  excludeUserId?: mongoose.Types.ObjectId
): Promise<boolean> {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};



userSchema.methods.isPasswordMatch = async function (
  password: string
): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};



userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});




export default model<UserDocument, UserModel>('user', userSchema);
