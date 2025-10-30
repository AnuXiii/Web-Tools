import PropTypes from "prop-types";

const ShinyLine = ({ angle }) => {
  const position = angle === "bottom" ? "bottom-0" : "top-0";
  return (
    <div
      className={`bg-base-content/20 absolute right-0 h-px w-full bg-linear-to-r ${position}`}
    ></div>
  );
};

ShinyLine.propTypes = {
  angle: PropTypes.string,
};

export default ShinyLine;
