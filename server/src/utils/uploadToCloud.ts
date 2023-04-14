import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

interface Props {
  files: {
    name: string;
    path: string;
  }[];
  folder: string;
}

export const uploadToCloud = async ({
  files,
  folder,
}: Props): Promise<string[]> => {
  const promises: Promise<UploadApiResponse>[] = [];

  files.forEach(({ name, path }) => {
    const promise = cloudinary.uploader
      .upload(path, {
        public_id: name,
        folder,
        // moderation: 'webpurify',
      })
      .then((result) => {
        fs.unlinkSync(path);
        return result;
      })
      .catch((err) => {
        fs.unlinkSync(path);
        return err;
      });
    promises.push(promise);
  });

  return Promise.all(promises)
    .then((values) => {
      return values.map((value) => value.url);
    })
    .catch((errors) => {
      return errors;
    });
};
