import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import { BarLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
};

const Loader = ({ loading, text = "loading...", spinLoader }) => {
  return spinLoader ? (
    <div className="flex-center bg-base-100 text-base-content absolute inset-0 z-2 h-full gap-3 rounded-lg">
      <Loader2 className="animate-spin" />
      <span>{text}</span>
    </div>
  ) : (
    <div className="flex-center h-[10vh] flex-col gap-3 text-center">
      <BarLoader
        color="var(--color-primary)"
        loading={loading}
        cssOverride={override}
        size={150}
      />
      <p>{text}</p>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  SpinLoader: PropTypes.bool,
};

export default Loader;
