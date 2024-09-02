import { v2 as cloudinary } from "cloudinary";


type CloudinaryType = {
    photo_Array: string[];
    folder_Name: string;
}


export const cloudinary_Handler = async ({
  photo_Array,
  folder_Name,
}: CloudinaryType) => {
  return await Promise.all(
    photo_Array.map((photo) => {
      return cloudinary.uploader.upload(photo, {
        folder: folder_Name,
      });
    })
  ).then((uploadResults) => {
    const upload_Info = uploadResults.map(({ public_id, secure_url }) => ({
      public_id,
      url: secure_url,
    }));

    return upload_Info;
  });
};


