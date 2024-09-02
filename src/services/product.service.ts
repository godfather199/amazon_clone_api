import { NextFunction } from 'express';
import Product from '../models/product.model'
import { ProductType } from '../types/product.type'
import { cloudinary_Handler } from '../utils/cloudinaryHandler';
import {Schema} from 'mongoose'

const { ObjectId } = Schema.Types;



export const create_Product_Service = async (user_Info: any) => {
    const new_Product = await Product.create(user_Info)
    
    return new_Product
}



export const products_By_SellerId = async (next: NextFunction) => {
  try {
    const fetch_Products = await Product.find({seller: "659a51451b67c886efd46d98"});

    return fetch_Products;
  } catch (error) {
    next(error);
  }
};



export const featured_Products_Service = async (next: NextFunction) => {
  try {
    const products = await Product.aggregate([
      {$sample: {size: 4}}
    ])

    return products
  } catch (error) {
    next(error)
  }
}



export const upload_Image_Service = async (product_Images: Express.Multer.File[]) => {
  const base64_Encoded_Images = product_Images.map((item) => {
    const base64Image = Buffer.from(item.buffer).toString("base64");
    const dataURI = `data:${item.mimetype};base64,${base64Image}`;

    return dataURI;
  });

  const cloudinary_Upload = await cloudinary_Handler({
    photo_Array: base64_Encoded_Images,
    folder_Name: "Amazon/Amazon_Product_Image",
  });

  return cloudinary_Upload
};



export const product_By_Id_Service = async (
  productId: string,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(productId)

    return product
  } catch (error) {
    next(error)
  }
};