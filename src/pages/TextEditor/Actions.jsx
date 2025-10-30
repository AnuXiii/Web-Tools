import Button from "../../components/Button";
import { Play, ArrowDownToLine, Link } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const Actions = ({ onFileUpload, onRun, onFileDonwload, isRunning }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 40rem)" });

  const handleChange = (e) => {
    onFileUpload(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div className="border-base-content/20 flex items-center justify-between gap-10 border-t border-solid p-3">
      <label
        htmlFor="upload-text-file"
        className="flex cursor-pointer items-center gap-2 italic opacity-70 select-none hover:opacity-100"
      >
        <Link size={16} />
        <span>attach file</span>
        <input
          type="file"
          accept="text/*"
          name="upload-text-file"
          id="upload-text-file"
          onChange={(e) => handleChange(e)}
          hidden
        />
      </label>
      <div className="flex-center gap-3">
        <Button
          text={!isMobile ? (isRunning ? "Running" : "Run") : ""}
          icon={isMobile && Play}
          onClick={() => onRun()}
          customClasses={`bg-primary text-primary-content p-3! ${isRunning ? "pointer-events-none" : ""}`}
        />
        <Button
          text={!isMobile && "Save file"}
          icon={isMobile && ArrowDownToLine}
          onClick={() => onFileDonwload()}
          customClasses={
            "bg-neutral text-white border-base-content/30 border p-3!"
          }
        />
      </div>
    </div>
  );
};

export default Actions;
