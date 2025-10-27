import { BarLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  height: "10vh",
};

const Loader = ({ loading }) => {
  return (
    <>
      <BarLoader
        color="var(--color-primary)"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </>
  );
};
export default Loader;
