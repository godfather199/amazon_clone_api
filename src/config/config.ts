import {config} from 'dotenv'
import Joi from 'joi';
import path from 'path';


config({ path: path.join(__dirname, '../../.env') });



const envVarSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    CLOUDINARY_CLOUD_NAME: Joi.string()
      .required()
      .description("Cloudinary cloud name"),
    CLOUDINARY_API_KEY: Joi.string()
      .required()
      .description("Cloudinary API Key"),
    CLOUDINARY_API_SECRET: Joi.string()
      .required()
      .description("Cloudinary API Secret"),
  })
  .unknown();


  const { value: envVars, error } = envVarSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);


  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  const PORT = envVars.PORT
  const DATABASE_URL = envVars.MONGODB_URL
  const JWT_SECRET = envVars.JWT_SECRET;
  const CLOUDINARY_CLOUD_NAME = envVars.CLOUDINARY_CLOUD_NAME
  const CLOUDINARY_API_KEY = envVars.CLOUDINARY_API_KEY
  const CLOUDINARY_API_SECRET = envVars.CLOUDINARY_API_SECRET

  
  export {
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
  };