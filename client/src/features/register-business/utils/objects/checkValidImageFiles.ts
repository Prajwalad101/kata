const imageTypeRegex = /image\/(png|jpg|jpeg)/i;

function checkValidImageFiles(files: FileList) {
  const filesArr = Array.from(files); // convert to array to perform array methods
  const validImageFiles: File[] = [];

  // filter for images for valid file path

  filesArr.forEach((file) => {
    if (file.type.match(imageTypeRegex)) {
      validImageFiles.push(file);
    }
  });

  return validImageFiles;
}

export default checkValidImageFiles;
