import { useEffect, useRef, useState } from "react";
import defaultData from "../assets/document/default-data.txt";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { FileCode, FileType, Link, Scaling } from "lucide-react";

// text area component
const TextArea = ({ hasUploaded, onTextChange, isUploading }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const hasFetched = useRef(false);

  // check data is uploaded
  useEffect(() => {
    if (!hasUploaded) return;
    setText(hasUploaded);
  }, [hasUploaded]);

  // upload default data when rendering
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadText = async () => {
      setStatus("loading");

      const savedValue = sessionStorage.textEditorValue;

      if (savedValue) {
        setText(savedValue);
        setStatus("success");
        return;
      }

      try {
        const res = await fetch(defaultData);
        if (!res.ok) throw new Error("Can't fetch data");
        const data = await res.text();
        setText(data);
        setStatus("success");
      } catch (error) {
        toast.error(`${error.message}`);
        setText("Can't load default data");
        setStatus("error");
      }
    };

    loadText();
  }, []);

  // track textarea value changed
  useEffect(() => {
    sessionStorage.textEditorValue = text;
    onTextChange(text);
  }, [text, onTextChange]);

  return (
    <>
      {status === "loading" || isUploading ? (
        <Loader />
      ) : (
        <textarea
          id="textarea"
          name="textarea"
          placeholder="Write text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-base-content/80 max-h-100 min-h-[30lvh] w-full border-none outline-none placeholder:opacity-50"
        ></textarea>
      )}
    </>
  );
};

// actions component used for controling upload, run and download file
const Actions = ({ onFileUpload, onRun, onFileDonwload }) => {
  // change file handler
  const handleChange = (e) => {
    onFileUpload(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div className="border-base-content/20 flex items-center justify-between gap-10 border-t border-solid p-3">
      {/* upload file button */}
      <label
        htmlFor="upload-text-file"
        className="flex cursor-pointer items-center gap-2 italic opacity-70 select-none hover:opacity-100"
      >
        <Link size={16} />
        <span>attach file</span>
        {/*  */}
        <input
          type="file"
          accept="text/*"
          name="upload-text-file"
          id="upload-text-file"
          onChange={(e) => handleChange(e)}
          hidden
        />
      </label>
      {/*  */}
      <div className="flex-center gap-3 max-sm:flex-col max-sm:*:w-full max-sm:*:py-2! max-sm:*:text-lg">
        {/*  */}
        <Button
          text="Run"
          onClick={() => onRun()}
          customClasses={"bg-primary text-primary-content p-3!"}
        />
        {/*  */}
        <Button
          text="Save file"
          onClick={() => onFileDonwload()}
          customClasses={
            "bg-neutral text-white border-base-content/30 border p-3!"
          }
        />
      </div>
    </div>
  );
};

const TextEditor = () => {
  const [uploadedText, setUploadedText] = useState("");
  const [fileToRun, setFileToRun] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  // save load preview format and download format from stroage
  const [previewFormat, setPreviewFormat] = useState(
    localStorage.previewFormat || "html",
  );
  const [downloadFormat, setDownloadFormat] = useState(
    localStorage.downloadFormat || "html",
  );

  useEffect(() => {
    localStorage.previewFormat = previewFormat;
    localStorage.downloadFormat = downloadFormat;
  }, [previewFormat, downloadFormat]);

  const handleFileUpload = async (fileUrl) => {
    const file = fileUrl;
    if (!file) return;

    try {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onload = () => {
        setUploadedText(reader.result);
        setIsUploading(false);
      };

      reader.onerror = () => {
        toast.error("Error when converted file");
        setIsUploading(false);
        reader.abort();
      };

      reader.readAsText(file);
    } catch (error) {
      toast.error(error.message);
      setIsUploading(false);
    }
  };

  const handleRunFile = async () => {
    if (!textContent) {
      toast.error("No text to run");
      return;
    }

    try {
      setIsPreviewLoading(true);

      if (fileToRun) URL.revokeObjectURL(fileToRun);

      const blob = new Blob([textContent], {
        type: `text/${previewFormat}`,
      });
      const url = URL.createObjectURL(blob);
      setFileToRun(url);
    } catch (error) {
      toast.error(error.message);
      setIsPreviewLoading(false);
    }
  };

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
    const blob = new Blob([textContent], { type: `text/${downloadFormat}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    Object.assign(a, {
      href: url,
      download: `${"output"}.${downloadFormat === "html" ? downloadFormat : "txt"}`,
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
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
                {/*  */}
                <i className="pointer-events-none absolute right-2 bottom-2 opacity-50">
                  <Scaling size={20} />
                </i>
              </div>
              <Actions
                onFileUpload={handleFileUpload}
                onRun={handleRunFile}
                onFileDonwload={handleFileDownload}
              />
            </div>
            <div className="mt-5">
              <ul className="flex flex-col items-center justify-start gap-3 sm:flex-row">
                <li className="max-sm:w-full">
                  <Button
                    text={`Preview format : ${previewFormat}`}
                    icon={previewFormat === "html" ? FileCode : FileType}
                    onClick={() =>
                      setPreviewFormat(
                        previewFormat === "html" ? "txt" : "html",
                      )
                    }
                    customClasses={
                      "w-full bg-neutral border border-base-content/30 text-white/90 text-sm! px-3!"
                    }
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
                <div className="flex-center relative mt-4 h-96 w-full flex-col border">
                  {isPreviewLoading && (
                    <div className="flex-center bg-base-200/80 absolute inset-0">
                      <Loader />
                    </div>
                  )}
                  <iframe
                    src={fileToRun}
                    title="preview"
                    className="*:text-base-content! h-full w-full"
                    onLoad={(e) => {
                      setIsPreviewLoading(false);
                      e.target.scrollIntoView({ block: "end" });
                    }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextEditor;
