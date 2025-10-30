import PropTypes from "prop-types";
import Button from "../../components/Button";
import { ScanLine, Upload } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/Loader";

const DecodeArea = ({
  decodeInput,
  setDecodeInput,
  onDecode,
  uploading,
  onUploadFile,
}) => {
  const [isPasting, setIsPasting] = useState(false);

  const handlePaste = (e) => {
    e.preventDefault();

    setIsPasting(true);
    const pastedText = e.clipboardData.getData("text");
    processLargeTextAsync(pastedText);
  };

  const processLargeTextAsync = (text) => {
    setTimeout(() => {
      setDecodeInput(text);
      setIsPasting(false);
    }, 0);
  };

  const handleChange = (e) => {
    setDecodeInput(e.target.value);
  };

  return (
    <div className="border-base-content/20 bg-base-200 focus-within:border-base-content animate-fade-up relative overflow-hidden rounded-lg border border-solid">
      {isPasting && <Loader spinLoader={true} />}
      <textarea
        name="decode-input"
        id="decode-input"
        placeholder="e.g: data:image/png;base64 + Enter"
        className="text-base-content/80 h-42 w-full resize-none border-none p-3 text-lg outline-none placeholder:opacity-50"
        onChange={handleChange}
        value={decodeInput}
        disabled={uploading || isPasting}
        onPaste={handlePaste}
      ></textarea>
      <div className="bg-base-300 border-base-content/20 flex justify-start gap-3 border-t border-solid p-3 max-sm:flex-col">
        <Button
          text={"Decode"}
          icon={ScanLine}
          onClick={() => onDecode()}
          customClasses={"bg-neutral text-white border-base-content/30 border "}
        />
        <label htmlFor="upload-base64" className="cursor-pointer">
          <input
            type="file"
            name="upload-base64"
            id="upload-base64"
            accept=".txt"
            onChange={(e) => onUploadFile(e.target.files[0])}
            disabled={uploading || isPasting}
            hidden
          />
          <Button
            tag="span"
            text={uploading ? "Uploading..." : "Upload"}
            icon={!uploading && Upload}
            customClasses={`bg-neutral text-white border-base-content/30 border ${uploading ? "pointer-events-none" : ""}`}
          />
        </label>
      </div>
    </div>
  );
};

DecodeArea.propTypes = {
  decoding: PropTypes.bool,
  decodeInput: PropTypes.string,
  setDecodeInput: PropTypes.func,
  onDecode: PropTypes.func,
  uploading: PropTypes.bool,
  onUploadFile: PropTypes.func,
};

export default DecodeArea;
