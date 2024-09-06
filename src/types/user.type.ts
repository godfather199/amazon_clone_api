import { Document, Model, Schema } from "mongoose";


const {ObjectId} = Schema.Types


export type UserType = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  profilePicture?: {
    public_Id: string;
    url: string;
  };
  products_Selling?: {
    productId: typeof ObjectId;
  }[],
  phoneNumber?: number;
  address?: {
    house_no: string;
    city: string;
    state: string;
    country: string;
  };
  cart?: typeof ObjectId;
  orders?: {
    orderId: typeof ObjectId;
  }[];
  whishlist?: {
    productId: typeof ObjectId;
  }[];
};


export type UserDocument = Document & UserType & {
  isPasswordMatch(password: string): Promise<boolean>;
}


export type UserModel = Model<UserDocument> & {
  isEmailTaken(
    email: string,
    excludeUserId?: typeof ObjectId
  ): Promise<boolean>;
  isUsernameTaken(
    username: string,
    excludeUserId?: typeof ObjectId
  ): Promise<boolean>;
};


