import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { FileCode, FileScan } from "lucide-react";
import fileReader from "../../utils/fileReader";
import UploadEncode from "./UploadEncode";
import DecodeArea from "./DecodeArea";
import ResultView from "./ResultView";
import ActionZone from "./ActionZone";

const FileEncoder = () => {
  const [mode, setMode] = useState("decode");
  const [fileMetaData, setFileMetaData] = useState({
    fileName: null,
    fileType: null,
  });
  const [result, setResult] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);
  const [decodeInput, setDecodeInput] = useState("");
  const [decoding, setDecoding] = useState(false);

  const base64Ref = useRef(null);

  const MAX_FILE_SIZE = 1024 * 50; // 50 MB
  const MAX_PREVIEW_THRESHOLD = 10000;
  const VALID_FORMATS = ["image", "audio", "video"];

  const handleFileUpload = async (fileObject) => {
    if (!fileObject) {
      toast.error("No file selected");
      return;
    }

    const file = fileObject;
    const isValidFormat = VALID_FORMATS.some((type) =>
      file.type.startsWith(type),
    );
    if (!isValidFormat) {
      toast.error("Invalid file format");
      return;
    }

    if (file.size / 1024 > MAX_FILE_SIZE) {
      toast.error("File size exceeds the allowed limit");
      return;
    }

    setUploading(true);
    setFileMetaData({ fileName: null, fileType: null });
    setResult("");
    setShowMore(false);
    base64Ref.current = null;

    try {
      const res = await fileReader(
        file,
        "dataURL",
        "Uploading file",
        "File uploaded successfully",
        "Error while uploading file",
      );

      base64Ref.current = await res.base64String;
      setFileMetaData({ fileName: res.fileName, fileType: res.fileType });
      handleEncode();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEncode = useCallback(() => {
    if (!base64Ref.current) {
      toast.error("No file to display");
      return;
    }
    setResult(base64Ref.current);
  }, []);

  const handleDecode = useCallback(() => {
    if (!decodeInput) {
      toast.error("Please upload or enter Base64 string");
      return;
    }

    setDecoding(true);

    try {
      const parts = decodeInput.split(",");
      if (parts.length !== 2 || !parts[0].startsWith("data:")) {
        toast.error("Invalid Base64 format");
        return;
      }

      const dataUrlPrefix = parts[0];
      const base64String = decodeInput;
      const mimeMatch = dataUrlPrefix.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9\-\\.]+);?base64/,
      );
      const fileType = mimeMatch ? mimeMatch[1] : "";
      if (!fileType) {
        toast.error("unsupported file type");
        return;
      }

      setFileMetaData({ fileName: "decoded_file", fileType: fileType });

      const renderers = {
        image: (src) => (
          <img
            src={src}
            alt="result"
            className="mx-auto rounded-lg object-cover"
          />
        ),
        audio: (src) => (
          <audio
            controls
            src={src}
            preload="metadata"
            className="mx-auto w-full"
          />
        ),
        video: (src) => (
          <video
            controls
            src={src}
            preload="metadata"
            className="mx-auto aspect-video w-full"
          />
        ),
      };

      const type = Object.keys(renderers).find((t) => fileType.includes(t));
      if (!type) {
        toast.error(`File format ${fileType} is not supported`);
        return;
      }

      base64Ref.current = base64String;
      setResult(renderers[type](base64String));
      setDecodeInput("");
    } catch (error) {
      toast.error("Error when processing" + error.message);
    } finally {
      setDecoding(false);
    }
  }, [decodeInput]);

  const handleFileDownload = async () => {
    if (!base64Ref.current) {
      toast.error("No file to download");
      return;
    }

    setDownloading(true);

    if (mode === "encode") {
      const { fileName } = fileMetaData;
      const base64DataUrl = base64Ref.current;
      const a = document.createElement("a");
      a.href =
        "data:text/plain;charset=utf-8," + encodeURIComponent(base64DataUrl);
      a.download = `${fileName}.txt`;
      a.click();
      setTimeout(() => setDownloading(false), 200);
    } else if (mode === "decode") {
      const { fileName, fileType } = fileMetaData;
      const dataURL = base64Ref.current;
      const format = fileType.split("/")[1] || "bin";
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `${fileName}.${format}`;
      a.click();
      setTimeout(() => setDownloading(false), 200);
    }
  };

  const handleTextCopy = async () => {
    if (!base64Ref.current) {
      toast.error("No text to copy");
      return;
    }

    setCopying(true);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(base64Ref.current);
        toast.success("Copied to clipboard");
      } else {
        toast.error("Copying text failed");
      }
    } catch (error) {
      toast.error("Copy failed");
      console.log(error.message);
    } finally {
      setCopying(false);
    }
  };

  useEffect(() => {
    if (result) {
      document.getElementById("result")?.scrollIntoView({ block: "end" });
    }
  }, [result]);

  useEffect(() => {
    if (showMore) {
      document.getElementById("action-zone")?.scrollIntoView({ block: "end" });
    }
  }, [showMore]);

  useEffect(() => {
    if (mode !== "decode") return;
    const handleDecodeOnKeyPress = (e) => {
      if (e.key.toLowerCase() === "enter" && e.srcElement.type === "textarea") {
        e.preventDefault();
        handleDecode();
      }
    };
    document.addEventListener("keypress", handleDecodeOnKeyPress);
    return () =>
      document.removeEventListener("keypress", handleDecodeOnKeyPress);
  }, [mode, handleDecode]);

  useEffect(() => {
    setFileMetaData({ fileName: null, fileType: null });
    setResult("");
    setUploading(false);
    setShowMore(false);
    setDecodeInput("");
    base64Ref.current = null;
  }, [mode]);

  return (
    <section id="file-encoder" className="w-full">
      <div className="container p-4">
        <div className="mx-auto max-w-3xl">
          <header className="flex-center mb-15 flex-col space-y-5 text-center">
            <h1 className="text-2xl font-semibold md:text-4xl">
              Encode & Decode Files
            </h1>
            <p className="text-base-content/80 bg-base-100 border-base-content/20 relative w-full overflow-hidden rounded-lg border border-solid p-2 leading-8 text-pretty md:rounded-full md:px-5 md:py-3">
              This online Base64 encoding and decoding tool helps you encode or
              decode a file from local or URL to Base64 without uploading the
              file.
              <span className="via-primary absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent"></span>
            </p>
          </header>
          {uploading ? (
            <Loader />
          ) : (
            <div>
              <div className="space-y-5">
                <div
                  className="flex-center w-max cursor-pointer justify-start gap-3 select-none"
                  onClick={() =>
                    mode === "encode" ? setMode("decode") : setMode("encode")
                  }
                >
                  <div className="bg-primary border-base-content flex h-8 w-16 items-center justify-start rounded-full border border-solid py-0.5">
                    <span
                      className={`text-neutral border-primary flex-center h-8 w-1/2 rounded-full bg-white duration-200 ${mode === "decode" && "translate-x-full"}`}
                    >
                      {mode === "encode" ? (
                        <FileCode size={20} />
                      ) : (
                        <FileScan size={20} />
                      )}
                    </span>
                  </div>
                  <p className="text-xl capitalize">{mode} mode</p>
                </div>
                <div className="min-h-[30lvh]">
                  {mode === "encode" ? (
                    <UploadEncode
                      uploading={uploading}
                      onUploadFile={handleFileUpload}
                    />
                  ) : (
                    <DecodeArea
                      decoding={decoding}
                      decodeInput={decodeInput}
                      setDecodeInput={setDecodeInput}
                      onDecode={handleDecode}
                      uploading={uploading}
                      onUploadFile={handleFileUpload}
                    />
                  )}
                </div>
              </div>
              {result && (
                <div id="result" className="space-y-5">
                  <h2 className="text-2xl font-semibold">Result :</h2>
                  <ResultView
                    mode={mode}
                    result={result}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    MAX_PREVIEW_THRESHOLD={MAX_PREVIEW_THRESHOLD}
                  />
                  <ActionZone
                    mode={mode}
                    downloading={downloading}
                    onDownload={handleFileDownload}
                    copying={copying}
                    onCopy={handleTextCopy}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileEncoder;
