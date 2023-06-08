/**
 * Truncates the text with ellipsis
 * @param {string} text - text to shorten
 * @param {number} length - words to shorten the text to
 * @example
 * truncateText('hello world', 1);  // returns hello
 */
export function truncateText(text: string, length: number) {
  const formattedText = text.split(' ').slice(0, length).join(' ') + '...';
  return formattedText;
}
