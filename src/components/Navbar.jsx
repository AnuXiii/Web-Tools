import { useEffect, useState } from "react";
import { routes } from "../constants";
import Logo from "./Logo";
import PropTypes from "prop-types";

const Navbar = ({ isOpen, onNavigate }) => {
  const [activePath, setActivePath] = useState(location.pathname);

  // highlight active path
  useEffect(() => {
    const handleRouteChange = (e) => {
      setActivePath(e.detail);
    };

    const handlePopState = () => {
      setActivePath(location.pathname);
    };

    window.addEventListener("route-change", handleRouteChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("route-change", handleRouteChange);
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <nav
      className={`max-lg:bg-base-300/80 p-4 max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:w-full max-lg:overflow-y-auto max-lg:px-8 max-lg:pt-30 max-lg:backdrop-blur-2xl ${isOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"} duration-200`}
    >
      <ul className="flex h-full items-center gap-10 max-lg:flex-col max-lg:items-center">
        <Logo />
        {routes.map(({ name, path }) => (
          <li key={path}>
            <a
              href={path}
              data-route={path}
              onClick={() => {
                setActivePath(path);
                onNavigate();
              }}
              className={`text-base-content hover:text-primary font-medium duration-200 ${activePath === path ? "active-path" : ""}`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isOpen: PropTypes.bool,
  onNavigate: PropTypes.func,
};

export default Navbar;
