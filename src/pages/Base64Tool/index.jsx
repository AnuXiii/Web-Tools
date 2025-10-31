import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { FileCode, FileScan } from "lucide-react";
import fileReader from "../../utils/fileReader";
import EncodeArea from "./EncodeArea";
import DecodeArea from "./DecodeArea";
import ResultView from "./ResultView";
import ActionZone from "./ActionZone";
import base64ToBlob from "../../utils/base64ToBlob";

const Base64Tool = () => {
  const [mode, setMode] = useState("encode");
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
  const [decodeObjectUrl, setDecodeObjectUrl] = useState(null);

  const base64Ref = useRef(null);

  const MAX_FILE_SIZE = 1024 * 50; // 50 MB
  const MAX_PREVIEW_THRESHOLD = 10000;
  const VALID_FORMATS = ["image", "audio", "video"];

  /**
   * @param {Boolean} isUploading true | false
   */
  const stateResetor = useCallback(
    (isUploading) => {
      setFileMetaData({ fileName: null, fileType: null });
      setUploading(isUploading);
      setDecodeInput("");

      setTimeout(() => {
        setResult(null);
        setShowMore(false);

        if (base64Ref.current) {
          base64Ref.current = null;
        }
      }, 0);
    },
    [setFileMetaData, setUploading, setDecodeInput],
  );

  /**
   * @param {File} fileObject
   */
  const handleFileUpload = async (fileObject) => {
    if (!fileObject) {
      toast.error("No file selected");
      return;
    }

    const file = fileObject;

    try {
      if (mode === "encode") {
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

        stateResetor(true);

        const response = await fileReader(
          file,
          "dataURL",
          "Uploading file",
          "File uploaded successfully",
          "Error while uploading file",
        );

        base64Ref.current = response.base64String;
        setFileMetaData({
          fileName: response.fileName,
          fileType: response.fileType,
        });
        handleEncode();
      } else if (mode === "decode") {
        if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
          toast.error("Invalid file format");
          return;
        }

        if (file.size / 1024 > MAX_FILE_SIZE) {
          toast.error("File size exceeds the allowed limit");
          return;
        }

        setUploading(true);

        const response = await fileReader(file, "text");

        base64Ref.current = response.base64String;
        handleDecode("fromUpload");
      }
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

  /**
   * @param from from ? fromInput | fromUpload
   */
  const handleDecode = useCallback(
    (from = "fromInput") => {
      let inputString = "";

      if (from === "fromUpload") {
        inputString = base64Ref.current;
      } else {
        inputString = decodeInput;
      }

      if (!inputString) {
        toast.error("Please upload or enter Base64 string");
        return;
      }

      base64Ref.current = inputString;

      try {
        const { objectUrl, fileType } = base64ToBlob(inputString);

        if (!fileType) {
          toast.error("Unsupported file type");
          return;
        }

        // set file metadata and render it to dom
        setFileMetaData({ fileName: "decoded_file", fileType: fileType });
        setDecodeObjectUrl(objectUrl);

        // render result as media file
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
          toast.error(`File format ${fileType} is not supported for rendering`);
          return;
        }

        setResult(renderers[type](objectUrl));
        setDecodeInput("");
        toast.success(`Decoded`);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [decodeInput],
  );

  useEffect(() => {
    if (decodeObjectUrl) {
      return () => {
        URL.revokeObjectURL(decodeObjectUrl);
      };
    }
  }, [decodeObjectUrl]);

  useEffect(() => {
    stateResetor(false);
  }, [mode, stateResetor]);

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
              decode a file from local or URL to Base64
              <span className="via-primary absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent"></span>
            </p>
          </header>
          {uploading ? (
            <Loader />
          ) : (
            <div className="space-y-10">
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
                    <EncodeArea
                      uploading={uploading}
                      onUploadFile={handleFileUpload}
                      base64Ref={base64Ref.current}
                      onTextCopy={setCopying}
                    />
                  ) : (
                    <DecodeArea
                      mode={mode}
                      uploading={uploading}
                      decodeInput={decodeInput}
                      setDecodeInput={setDecodeInput}
                      onDecode={handleDecode}
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
                    onDownload={setDownloading}
                    copying={copying}
                    onCopy={setCopying}
                    base64Ref={base64Ref.current}
                    fileMetaData={fileMetaData}
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

export default Base64Tool;
