import { useEffect, useRef, useState } from "react";
import defaultData from "../assets/document/default-data.txt";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { FileCode, FileType, Link, Scaling } from "lucide-react";

// text area component
const TextArea = ({ hasUploaded, onTextChange }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const hasFeched = useRef(false);

  // check data is uploaded
  useEffect(() => {
    if (!hasUploaded) return;
    setText(hasUploaded);
  }, [hasUploaded]);

  // upload default data when rendering
  useEffect(() => {
    if (hasFeched.current) return;
    hasFeched.current = true;

    const loadText = async () => {
      try {
        setStatus("loading");
        const res = await fetch(defaultData);

        if (!res.ok) {
          throw new Error("Can't fetch data");
        }

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
  });

  // track textarea value changed
  useEffect(() => {
    onTextChange(text);
  }, [text, onTextChange]);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <textarea
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
        className="flex cursor-pointer items-center gap-2 italic opacity-70 hover:opacity-100"
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
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedText(reader.result);
        reader.abort();
      };
      reader.onerror = () => {
        toast.error("Error when converted file");
        reader.abort();
      };

      reader.readAsText(file);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRunFile = async () => {
    if (!textContent) {
      toast.error("No text to run");
      return;
    }

    try {
      const blob = new Blob([textContent], {
        type: `text/${previewFormat}`,
      });
      const url = URL.createObjectURL(blob);
      setFileToRun(url);
      return () => URL.revokeObjectURL(blob);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      download: `${location.pathname}.${downloadFormat === "html" ? downloadFormat : "txt"}`,
    });
    a.click();
    URL.revokeObjectURL(url);
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
              <ul className="flex items-center gap-3">
                <li>
                  <Button
                    text={`Preview format : ${previewFormat}`}
                    icon={previewFormat === "html" ? FileCode : FileType}
                    onClick={() =>
                      setPreviewFormat(
                        previewFormat === "html" ? "txt" : "html",
                      )
                    }
                    customClasses={
                      "bg-neutral border border-base-content/30 text-white/90 text-sm! px-3!"
                    }
                  />
                </li>
                <li>
                  <Button
                    text={`Download format : ${downloadFormat}`}
                    icon={downloadFormat === "html" ? FileCode : FileType}
                    onClick={() =>
                      setDownloadFormat(
                        downloadFormat === "html" ? "txt" : "html",
                      )
                    }
                    customClasses={
                      "bg-neutral border border-base-content/30 text-white/90 text-sm! px-3!"
                    }
                  />
                </li>
              </ul>
              {fileToRun && (
                <iframe
                  src={fileToRun}
                  title="preview"
                  className="*:text-base-content! mt-4 h-96 w-full border"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextEditor;
