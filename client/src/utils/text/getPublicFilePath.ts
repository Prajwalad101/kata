/**
 * Converts the file path to be relative to the public folder
 *
 * Eg: client/public/images => /images
 *
 * If the path does not lead to public, it returns the original path instead
 * @param path the path to extract the public path from
 * @returns the path relative to the public folder
 */
export function getPublicFilePath(path: string) {
  // only get the path inside the public folder
  const regExp = /public(.*)/;

  const match = regExp.exec(path);
  if (!match) return path;

  // replace back slashes with forward slashes
  const publicPath = match[1].replace(/\\/g, '/');
  return publicPath;
}
