import app from './app'
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  PORT,
} from "./config/config";
import { v2 as cloudinary } from "cloudinary";
import connect_MongoDB from './utils/db';



// Database connection
connect_MongoDB()



// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});



// Start server
app.listen(PORT, () => {
  console.log(`Server started on ported: ${PORT}`);
});


