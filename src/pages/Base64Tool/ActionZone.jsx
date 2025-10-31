import PropTypes from "prop-types";
import Button from "../../components/Button";
import { Download, Copy } from "lucide-react";
import { toast } from "react-toastify";

const ActionZone = ({
  mode,
  downloading,
  onDownload,
  copying,
  onCopy,
  base64Ref,
  fileMetaData,
}) => {
  const handleFileDownload = async () => {
    if (!base64Ref) {
      toast.error("No file to download");
      return;
    }

    onDownload(true);

    if (mode === "encode") {
      const { fileName } = fileMetaData;
      const base64DataUrl = base64Ref;

      const a = document.createElement("a");
      a.href =
        "data:text/plain;charset=utf-8," + encodeURIComponent(base64DataUrl);
      a.download = `${fileName}.txt`;
      a.click();

      setTimeout(() => onDownload(false), 200);
      //
    } else if (mode === "decode") {
      const { fileName, fileType } = fileMetaData;
      const format = fileType.split("/")[1] || "bin"; // export file format
      const base64DataUrl = base64Ref;

      const a = document.createElement("a");
      a.href = base64DataUrl;
      a.download = `${fileName}.${format}`;
      a.click();

      setTimeout(() => onDownload(false), 200);
      //
    }
  };

  const handleTextCopy = async () => {
    if (!base64Ref) {
      toast.error("No text to copy");
      return;
    }

    onCopy(true);

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(base64Ref);
        toast.success("Copied to clipboard");
      } else {
        toast.error("Copying text failed");
      }
    } catch (error) {
      toast.error("Copy failed" + error.message);
    } finally {
      onCopy(false);
    }
  };

  return (
    <div id="action-zone" className="flex gap-3 max-sm:flex-col">
      <Button
        text={downloading ? "Downloading..." : "Download"}
        icon={!downloading && Download}
        onClick={() => handleFileDownload()}
        customClasses={`bg-primary text-primary-content ${downloading ? "pointer-events-none" : ""}`}
      />
      {mode === "encode" && (
        <Button
          text={copying ? "Copying..." : "Copy Text"}
          icon={!copying && Copy}
          onClick={() => handleTextCopy()}
          customClasses={`bg-primary text-primary-content ${copying ? "pointer-events-none" : ""}`}
        />
      )}
    </div>
  );
};

ActionZone.propTypes = {
  mode: PropTypes.string,
  downloading: PropTypes.bool,
  onDownload: PropTypes.func,
  copying: PropTypes.bool,
  onCopy: PropTypes.func,
};

export default ActionZone;
