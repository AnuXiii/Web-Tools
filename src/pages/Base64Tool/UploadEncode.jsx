import Button from "../../components/Button";

const UploadEncode = ({ uploading, onUploadFile }) => {
  return (
    <div className="animate-fade-up">
      <label
        htmlFor="upload-file"
        className={`border-base-content/20 flex-center group bg-base-100 h-32 w-full cursor-pointer rounded-lg border-3 border-dashed p-4 text-center text-pretty select-none ${uploading && "pointer-events-none"}`}
        onDrop={(e) => {
          e.preventDefault();
          onUploadFile(e.dataTransfer.files[0]);
          e.target.classList.remove("border-primary");
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.target.classList.add("border-primary");
        }}
        onDragEnd={(e) => {
          e.target.classList.remove("border-primary");
        }}
        onDragLeave={(e) => {
          e.target.classList.remove("border-primary");
        }}
      >
        <input
          type="file"
          name="upload-file"
          id="upload-file"
          accept="image/*,audio/*,video/*"
          onChange={(e) => onUploadFile(e.target.files[0])}
          disabled={uploading}
          hidden
        />
        <span className="text-xl font-semibold group-hover:opacity-80">
          Click to select file or drop file here
        </span>
      </label>
    </div>
  );
};

export default UploadEncode;
