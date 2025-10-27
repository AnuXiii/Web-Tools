import Frame from "./Frame";

const Main = ({ children }) => {
  return (
    <main
      id="main"
      className="flex-center relative min-h-screen flex-col py-15 md:py-30"
    >
      <Frame />
      {children}
    </main>
  );
};
export default Main;
