/**
 * @param {string} dataUrl base64 format.
 * @returns {object} object with objectUrl & fileType.
 */

function base64ToBlob(dataUrl) {
  const parts = dataUrl.split(",");
  const dataUrlPrefix = parts[0];
  const dataBase64 = parts[1];

  const mimeMatch = dataUrlPrefix.match(
    /data:([a-zA-Z0-9]+\/[a-zA-Z0-9\-\/.]+);?base64/,
  );
  if (!mimeMatch || mimeMatch.length < 2) {
    throw new Error("Uploaded file has invalid Base64 string");
  }
  const fileType = mimeMatch[1];

  const byteCharacters = atob(dataBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: fileType });
  const objectUrl = URL.createObjectURL(blob);

  return { objectUrl, fileType };
}

export default base64ToBlob;
