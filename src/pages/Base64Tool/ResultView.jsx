import { useEffect } from "react";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const ResultView = ({
  mode,
  result,
  showMore,
  setShowMore,
  MAX_PREVIEW_THRESHOLD,
}) => {
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

  return (
    <>
      {mode === "encode" ? (
        <div className="flex-center border-base-content/20 bg-base-200 relative flex-col space-y-5 rounded-lg border p-4">
          <p
            className={`break-all select-all ${!showMore && "via-base-content bg-linear-to-b from-transparent to-transparent bg-clip-text text-transparent select-none"}`}
          >
            {result.length >= MAX_PREVIEW_THRESHOLD ? (
              <>
                {[...result].slice(0, 300)}
                <span className="bg-error absolute right-1/2 bottom-1/2 z-1 w-max translate-1/2 rounded-lg p-3 text-white">
                  Data is too large for full preview
                </span>
              </>
            ) : (
              <>
                {showMore
                  ? result
                  : typeof result === "string" && [...result].slice(0, 300)}
                <Button
                  text={
                    showMore ? "show less" : `show more ${result.length} letter`
                  }
                  customClasses={`w-max border border-base-content/20 bg-neutral ml-auto mt-5 rounded-lg py-3! text-base! text-white ${!showMore && "absolute right-1/2 bottom-1/2 z-1 translate-1/2 active:translate-y-1/2!"}`}
                  onClick={() => setShowMore(!showMore)}
                />
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="border-base-content/20 overflow-hidden rounded-lg border border-solid shadow-md">
          {result}
        </div>
      )}
    </>
  );
};

ResultView.propTypes = {
  mode: PropTypes.string,
  result: PropTypes.string,
  showMore: PropTypes.bool,
  setShowMore: PropTypes.func,
  MAX_PREVIEW_THRESHOLD: PropTypes.number,
};

export default ResultView;
