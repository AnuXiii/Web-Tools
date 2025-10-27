import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // set theme on root and local storage
  const handleSetTheme = (themeScheme) => {
    setTheme(themeScheme);
    setIsOpen(!isOpen);

    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(themeScheme);

    localStorage.theme = themeScheme;
  };

  // close theme dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-theme-toggle]") && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // close theme dropdown when press ESC
  useEffect(() => {
    const handleOnKeyPress = (e) => {
      if (e.key.toLowerCase() === "escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keyup", handleOnKeyPress);

    return () => {
      document.removeEventListener("keyup", handleOnKeyPress);
    };
  });

  // load theme from local stroage
  useEffect(() => {
    const saved = localStorage.theme || "light";
    document.documentElement.classList.add(saved);
    setTheme(saved);
  }, []);

  // set theme on other tabs with storage event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        handleSetTheme(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  });

  return (
    <div data-theme-toggle className="borderX relative z-50 border-r">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-primary focus:outline-primary focus:text-primary p-4 outline outline-transparent duration-100 outline-solid"
      >
        {theme === "dark" ? <Moon size={40} /> : <Sun size={40} />}
      </button>
      <ul
        className={`bg-base-200 shadow-neutral/10 border-base-content/10 divide-base-content/10 absolute top-[110%] left-1 w-full divide-y rounded-lg border border-solid shadow-2xl ${isOpen ? "" : "hidden"}`}
      >
        <li>
          <button
            className="flex-center hover:text-primary w-full py-4 text-center duration-100"
            onClick={() => handleSetTheme("light")}
          >
            <Sun />
          </button>
        </li>
        <li>
          <button
            className="flex-center hover:text-primary w-full py-4 text-center duration-100"
            onClick={() => handleSetTheme("dark")}
          >
            <Moon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeToggle;
