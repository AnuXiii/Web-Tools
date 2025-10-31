import { Suspense } from "react";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import MusicPlayer from "./layouts/MusicPlayer";
import Router from "./hooks/useRouter";

const App = () => {
  const RouteComponent = Router();

  return (
    <div role="application" className="overflow-hidden">
      <Header />
      <Suspense fallback={<Loader />}>
        <Main>{RouteComponent}</Main>
      </Suspense>
      <Footer />
      <MusicPlayer />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable
        theme="colored"
        className={"cursor-grab font-semibold select-none"}
        newestOnTop
      />
    </div>
  );
};
export default App;
