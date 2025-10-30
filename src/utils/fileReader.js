import PropTypes from "prop-types";
import { toast } from "react-toastify";

/**
 * @param {File} file - File object
 * @param {string} readMethod - read method "arrayBuffer" | "text" | "dataURL"
 * @param {string} pending - pending toast message
 * @param {string} success - success toast message
 * @param {string} error - error toast message
 * @param {Function} onProgress - progress.callback
 * @returns a object with base64String - file name - file type
 */

function fileReader(file, readMethod, pending, success, error, onProgress) {
  if (!file) return;

  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve({
        base64String: reader.result,
        fileName: file.name,
        fileType: file.type,
      });

    reader.onprogress = (e) => {
      if (e.lengthComputable && typeof onProgress === "function") {
        const percent = Math.floor((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    reader.onerror = () => {
      reject(reader.error ? reader.error.message : "Error when reading file");
      reader.abort();
    };

    if (readMethod === "text") {
      reader.readAsText(file);
    } else if (readMethod === "dataURL") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });

  toast.promise(promise, {
    pending,
    success,
    error,
  });

  return promise;
}

export default fileReader;
