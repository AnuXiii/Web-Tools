import { BarLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
};

const Loader = ({ loading }) => {
  return (
    <div className="flex-center h-[10vh] flex-col gap-3 text-center">
      <BarLoader
        color="var(--color-primary)"
        loading={loading}
        cssOverride={override}
        size={150}
      />
      <p>loading...</p>
    </div>
  );
};
export default Loader;
