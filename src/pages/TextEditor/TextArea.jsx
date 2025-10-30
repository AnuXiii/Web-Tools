import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import defaultData from "../../assets/document/default-data.txt";

const TextArea = ({ hasUploaded, onTextChange, isUploading }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("loading");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasUploaded) return;
    setText(hasUploaded);
  }, [hasUploaded]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadText = async () => {
      const savedValue = sessionStorage.textEditorValue;
      if (savedValue) {
        setText(savedValue);
        setStatus("success");
        return;
      }

      const promise = async () => {
        try {
          const res = await fetch(defaultData);
          if (!res.ok) throw new Error("Can't fetch data");
          const data = await res.text();
          setText(data);
          setStatus("success");
        } catch (error) {
          setStatus("error");
          toast.error(error.message);
        }
      };

      toast.promise(promise, {
        pending: "Loading default data...",
        success: "Default data loaded",
        error: "Can't load default data",
      });
    };
    loadText();
  }, []);

  useEffect(() => {
    try {
      sessionStorage.textEditorValue = text;
    } catch (error) {
      toast.error(error.message);
      setText("");
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

export default TextArea;
