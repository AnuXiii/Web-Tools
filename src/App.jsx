import { Suspense, useEffect, useState } from "react";
import { routes } from "./constants";
import NotFound from "./pages/NotFound";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  // app name
  const appName = "Web Tools";
  // check user if not in modal path
  const initialPath = location.pathname.includes("modal")
    ? (location.pathname = "/")
    : location.pathname;

  // keep save current path state
  const [currentPath, setCurrentPath] = useState(initialPath);

  // find jsx component by path
  const getComponent = (path) => {
    const route = routes.find((r) => r.path === path);

    if (path === "/" || path === "/home") {
      document.title = `${appName} | Home`;
      return <Hero />;
    } else if (route && route.component) {
      document.title = `${appName} | ${route.name}`;
      const Component = route.component;
      return <Component />;
    } else {
      document.title = `${appName} | Not found 404`;
      return <NotFound />;
    }
  };

  // set active class to current path
  const setActivePath = (path) => {
    const currentPath = "nav ul li [data-route].active-path";
    const newPath = `nav ul li [data-route="${path}"]`;

    if (currentPath && newPath) {
      document.querySelector(currentPath)?.classList.remove("active-path");
      document.querySelector(newPath)?.classList.add("active-path");
    }
  };

  // handle click on link by data-route
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("[data-route]");
      if (!target) return;

      e.preventDefault();
      const newPath = target.dataset.route;

      // save current path scroll position
      history.scrollRestoration = "auto";

      if (history.state) {
        // prevent push same state just replace the path to history
        if (history.state.name === newPath) {
          history.replaceState({ name: newPath }, "", newPath);
          return;
        }
      }

      // push new state to history
      history.pushState({ name: newPath }, "", newPath);
      setCurrentPath(newPath);
      setActivePath(target.dataset.route);
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  });

  // handle (back / forward) button on browser
  useEffect(() => {
    const handlePopState = () => {
      const route = routes.find((r) => r.path === location.pathname);
      if (!route) return;
      setCurrentPath(route.path);
      setActivePath(route.path);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <div role="application" className="overflow-hidden">
      <Header />
      <Suspense fallback={<Loader />}>
        <Main>{getComponent(currentPath)}</Main>
      </Suspense>
      <Footer />
      <ToastContainer />
      <MusicPlayer />
    </div>
  );
};
export default App;
