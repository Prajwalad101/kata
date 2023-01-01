import multer from 'multer';

interface UploadFilesProps {
  path: string;
  maxCount: number;
  fieldName: string;
}

/**
 *
 * @param props.path FilePath to save the files to
 * @param props.maxCount Max numbers to files allowed
 * @param props.fieldName Name of the field containing images
 * @returns multer middleware that processes multiple files
 */
function uploadFiles({ path, maxCount, fieldName }: UploadFilesProps) {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path);
    },
    filename: (_req, file, cb) => {
      const currentDate = new Date().toISOString().split('')[0];
      const fileExtension = file.originalname.split('.').pop();
      //! Suffix might not be 100% unique
      const uniqueSuffix =
        currentDate + '-' + Date.now() + Math.round(Math.random() * 1e9);

      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    },
  });

  const upload = multer({
    storage: storage,
  });

  return upload.array(fieldName, maxCount);
}

export default uploadFiles;
