import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import routes from "./constants/routes";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import MusicPlayer from "./layouts/MusicPlayer";
import Loader from "./components/Loader";
import Hero from "./pages/Hero";
import NotFound from "./pages/NotFound";

const App = () => {
  const appName = "Web Tools"; // app name
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // find jsx component by path
  const getComponent = (path) => {
    const route = routes.find((r) => r.path === path);

    if (path === "/" || path === "/home") {
      return <Hero />;
    } else if (route && route.component) {
      const Component = route.component;
      return <Component />;
    } else {
      return <NotFound />;
    }
  };

  useEffect(() => {
    const route = routes.find((r) => r.path === currentPath);
    document.title = route
      ? `${appName} | ${route.name}`
      : `${appName} : Not Found 404`;
  }, [currentPath]);

  // handle click on link by data-route
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("[data-route]");
      if (!target) return;

      e.preventDefault();
      const newPath = target.dataset.route;

      // save current path scroll position
      history.scrollRestoration = "auto";

      // prevent push same state just replace the path to history
      if (history.state?.name === newPath) return;

      if (history.state?.isModal) {
        history.replaceState({ name: newPath }, "", newPath);
      } else {
        history.pushState({ name: newPath }, "", newPath);
      }

      setCurrentPath(newPath);

      window.dispatchEvent(
        new CustomEvent("route-change", { detail: newPath }),
      );
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // handle (back / forward) button on browser
  useEffect(() => {
    const handlePopState = () => {
      const path = location.pathname;
      setCurrentPath(path);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div role="application" className="overflow-hidden">
      <Header />
      <Suspense fallback={<Loader />}>
        <Main>{getComponent(currentPath)}</Main>
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
