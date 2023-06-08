function readFilesAsDataURL(files: File[]) {
  const fileReaders: FileReader[] = [];

  const promises = files.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReaders.push(fileReader);

      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          resolve(result.toString());
        }
      };
      fileReader.onabort = () => {
        reject(new Error('File reading aborted'));
      };

      fileReader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      fileReader.readAsDataURL(file);
    });
  });

  return { promises, fileReaders };
}

export default readFilesAsDataURL;
