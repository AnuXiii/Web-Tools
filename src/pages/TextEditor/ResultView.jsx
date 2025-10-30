import PropTypes from "prop-types";

const ResultView = ({ isPreviewLoading, fileToRun, setIsPreviewLoading }) => {
  return (
    <div className="flex-center relative mt-4 h-96 w-full flex-col border">
      {isPreviewLoading ? (
        <div className="flex-center bg-base-200/80 absolute inset-0"></div>
      ) : (
        <iframe
          src={fileToRun}
          title="preview"
          className="h-full w-full text-white *:text-white"
          onLoad={(e) => {
            setIsPreviewLoading(false);
            e.target.scrollIntoView({ block: "end" });
            const styles = document.createElement("style");
            styles.textContent = `
                        html { color-scheme: dark light; }
                        body { padding: 0.5rem; font-family: sans-serif; line-height: 1.6rem; }`;
            e.target.contentDocument.head.appendChild(styles);
          }}
        ></iframe>
      )}
    </div>
  );
};

ResultView.propTypes = {
  isPreviewLoading: PropTypes.bool,
  fileToRun: PropTypes.string,
  setIsPreviewLoading: PropTypes.func,
};

export default ResultView;
