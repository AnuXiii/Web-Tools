import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileCode, FileType } from "lucide-react";
import Button from "../../components/Button";
import fileReader from "../../utils/fileReader";
import TextArea from "./TextArea";
import Actions from "./Actions";
import ResultView from "./ResultView";

const TextEditor = () => {
  const [uploadedText, setUploadedText] = useState("");
  const [fileToRun, setFileToRun] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewFormat, setPreviewFormat] = useState(
    localStorage.previewFormat || "html",
  );
  const [downloadFormat, setDownloadFormat] = useState(
    localStorage.downloadFormat || "html",
  );

  const MAX_FILE_SIZE = 1024 * 4; // 4 MB

  useEffect(() => {
    localStorage.previewFormat = previewFormat;
    localStorage.downloadFormat = downloadFormat;
  }, [previewFormat, downloadFormat]);

  const handleFileUpload = async (fileUrl) => {
    const file = fileUrl;
    if (!file) return;

    if (file.size / 1024 > MAX_FILE_SIZE) {
      toast.error("File size exceeds the allowed limit");
      return;
    }

    if (!file.type.startsWith("text")) {
      toast.error("Unvalid file format");
      return;
    }

    setIsUploading(true);
    sessionStorage.textEditorValue = "";

    try {
      const promise = await fileReader(
        file,
        "text",
        "Uploading file",
        "File uploaded successfully",
        "Error while uploading file",
      );
      setUploadedText(promise.base64String);
      setIsUploading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRunFile = useCallback(async () => {
    if (!textContent) {
      toast.error("No text to run");
      return;
    }

    const promise = async () => {
      setIsPreviewLoading(true);

      try {
        if (fileToRun) URL.revokeObjectURL(fileToRun);
        const blob = new Blob([textContent], { type: `text/${previewFormat}` });
        const url = URL.createObjectURL(blob);
        setFileToRun(url);
      } catch (error) {
        setIsPreviewLoading(false);
        toast.error(error.message);
      } finally {
        setIsPreviewLoading(false);
      }
    };

    toast.promise(promise, {
      pending: "Preview Loading...",
      success: "Preview Loaded",
      error: "Error when loading preview",
    });
  }, [textContent, fileToRun, previewFormat]);

  useEffect(() => {
    return () => {
      if (fileToRun) URL.revokeObjectURL(fileToRun);
    };
  }, [fileToRun]);

  useEffect(() => {
    if (!textContent) return;
    handleRunFile();
  }, [previewFormat]);

  const handleFileDownload = () => {
    if (!textContent) {
      toast.error("No file to donwload");
      return;
    }

    const url =
      "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${"output"}.${downloadFormat === "html" ? "html" : "txt"}`;
    a.click();
  };

  return (
    <section id="text-editor" className="w-full">
      <div className="container p-4">
        <div className="mx-auto max-w-3xl space-y-5">
          <h1 className="text-2xl font-semibold">
            Read, edit, view & save text format files
          </h1>
          <div>
            <div className="border-base-content/20 bg-base-200 focus-within:border-base-content rounded-lg border border-solid">
              <div className="relative p-3">
                <TextArea
                  hasUploaded={uploadedText}
                  onTextChange={setTextContent}
                  isUploading={isUploading}
                />
                <i className="pointer-events-none absolute right-2 bottom-2 opacity-50"></i>
              </div>
              <Actions
                onFileUpload={handleFileUpload}
                onRun={handleRunFile}
                isRunning={isPreviewLoading}
                onFileDonwload={handleFileDownload}
              />
            </div>
            <div className="mt-5">
              <ul className="flex flex-col items-center justify-start gap-3 sm:flex-row">
                <li className="max-sm:w-full">
                  <Button
                    text={
                      isPreviewLoading
                        ? "Loading..."
                        : `Preview format : ${previewFormat}`
                    }
                    icon={previewFormat === "html" ? FileCode : FileType}
                    onClick={() =>
                      setPreviewFormat(
                        previewFormat === "html" ? "txt" : "html",
                      )
                    }
                    customClasses={`w-full bg-neutral border border-base-content/30 text-white/90 text-sm! px-3! ${isPreviewLoading ? "pointer-events-none" : ""}`}
                  />
                </li>
                <li className="max-sm:w-full">
                  <Button
                    text={`Download format : ${downloadFormat}`}
                    icon={downloadFormat === "html" ? FileCode : FileType}
                    onClick={() =>
                      setDownloadFormat(
                        downloadFormat === "html" ? "txt" : "html",
                      )
                    }
                    customClasses={
                      "w-full bg-neutral border border-base-content/30 text-white/90 text-sm! px-3!"
                    }
                  />
                </li>
              </ul>
              {fileToRun && (
                <ResultView
                  setIsPreviewLoading={setIsPreviewLoading}
                  isPreviewLoading={isPreviewLoading}
                  fileToRun={fileToRun}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextEditor;
