import { useEffect, useRef, useState } from "react";
import defaultData from "../assets/document/default-data.txt";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/Button";
import {
  ArrowDownToLine,
  FileCode,
  FileType,
  Link,
  Play,
  Scaling,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";

// text area component
const TextArea = ({ hasUploaded, onTextChange, isUploading }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("loading");
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
      const promise = new Promise(async (resolve, reject) => {
        try {
          const savedValue = sessionStorage.textEditorValue;
          if (savedValue) {
            setText(savedValue);
            setStatus("success");
            resolve("Loaded from session storage");
            return;
          }

          const res = await fetch(defaultData);
          if (!res.ok) throw new Error("Can't fetch data");

          const data = await res.text();
          setText(data);
          setStatus("success");
          resolve("Default data loaded");
        } catch (error) {
          setStatus("error");
          reject(error);
        }
      });

      toast.promise(promise, {
        pending: "Loading default data...",
        success: "Default data loaded",
        error: "Can't load default data",
      });
    };

    loadText();
  }, []);

  // track textarea value changed
  useEffect(() => {
    try {
      sessionStorage.textEditorValue = text;
    } catch (error) {
      toast.error("File size exceeds the allowed limit");
      setText("");
      console.log(error.message);
    }

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
  const isMobile = useMediaQuery({ query: "(max-width: 40rem)" });

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
      <div className="flex-center gap-3">
        {/*  */}
        <Button
          text={!isMobile && "Run"}
          icon={isMobile && Play}
          onClick={() => onRun()}
          customClasses={"bg-primary text-primary-content p-3!"}
        />
        {/*  */}
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

    const MAX_FILE_SIZE = 1024 * 4; // 4 MB

    // check file size
    if (file.size / 1024 > MAX_FILE_SIZE) {
      toast.error("File size exceeds the allowed limit");
      return;
    }
    // check file type
    if (!file.type.startsWith("text")) {
      toast.error("Incorrect file format");
      return;
    }

    const promise = new Promise((resolve, reject) => {
      setIsUploading(true);
      sessionStorage.textEditorValue = "";

      const reader = new FileReader();

      reader.onload = () => {
        setIsUploading(false);
        setUploadedText(reader.result);
        resolve("File uploaded successfully");
      };

      reader.onerror = () => {
        setIsUploading(false);
        reject("Error reading file");
        reader.abort();
      };

      reader.readAsText(file);
    });

    toast.promise(promise, {
      pending: "Uploading file",
      success: "File uploaded successfully",
      error: "Error while uploading file",
    });
  };

  const handleRunFile = async () => {
    if (!textContent) {
      toast.error("No text to run");
      return;
    }

    const promise = new Promise((resolve, reject) => {
      try {
        setIsPreviewLoading(true);
        if (fileToRun) URL.revokeObjectURL(fileToRun);

        const blob = new Blob([textContent], {
          type: `text/${previewFormat}`,
        });
        const url = URL.createObjectURL(blob);
        setFileToRun(url);
        setIsPreviewLoading(false);
        resolve();
      } catch (error) {
        setIsPreviewLoading(false);
        reject(error);
      }
    });

    toast.promise(promise, {
      pending: "Generating preview...",
      success: "Preview ready 🎉",
      error: "Failed to generate preview",
    });
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
    if (!textContent) {
      toast.error("No file to donwload");
      return;
    }

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
