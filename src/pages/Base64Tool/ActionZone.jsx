import Button from "../../components/Button";
import { Download, Copy } from "lucide-react";

const ActionZone = ({ mode, downloading, onDownload, copying, onCopy }) => {
  return (
    <div id="action-zone" className="flex gap-3 max-sm:flex-col">
      <Button
        text={downloading ? "Downloading..." : "Download"}
        icon={!downloading && Download}
        onClick={() => onDownload()}
        customClasses={`bg-primary text-primary-content ${downloading ? "pointer-events-none" : ""}`}
      />
      {mode === "encode" && (
        <Button
          text={copying ? "Copying..." : "Copy Text"}
          icon={!copying && Copy}
          onClick={() => onCopy()}
          customClasses={`bg-primary text-primary-content ${copying ? "pointer-events-none" : ""}`}
        />
      )}
    </div>
  );
};

export default ActionZone;
