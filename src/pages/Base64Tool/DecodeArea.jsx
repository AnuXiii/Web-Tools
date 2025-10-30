import Button from "../../components/Button";
import { ScanLine, Upload } from "lucide-react";

const DecodeArea = ({
  decoding,
  decodeInput,
  setDecodeInput,
  onDecode,
  uploading,
  onUploadFile,
}) => {
  return (
    <div className="border-base-content/20 bg-base-200 focus-within:border-base-content animate-fade-up relative overflow-hidden rounded-lg border border-solid">
      <textarea
        name="decode-input"
        id="decode-input"
        placeholder="data:format"
        className="text-base-content/80 h-42 w-full resize-none border-none p-3 text-lg outline-none placeholder:opacity-50"
        onChange={(e) => setDecodeInput(e.target.value)}
        value={decodeInput}
      ></textarea>
      <div className="bg-base-300 border-base-content/20 flex justify-start gap-3 border-t border-solid p-3 max-sm:flex-col">
        <Button
          text={decoding ? "Decoding..." : "Decode"}
          icon={!decoding && ScanLine}
          onClick={() => onDecode()}
          customClasses={`bg-neutral text-white border-base-content/30 border ${decoding ? "pointer-events-none" : ""}`}
        />
        <label htmlFor="upload-base64" className="cursor-pointer">
          <input
            type="file"
            name="upload-base64"
            id="upload-base64"
            accept=".txt,.base64"
            onChange={(e) => onUploadFile(e.target.files[0])}
            disabled={uploading}
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

export default DecodeArea;
