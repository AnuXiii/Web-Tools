import { useState } from "react";
import Logo from "../components/Logo";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ShinyLine from "../components/ShinyLine";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // handle navbar collapse state
  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <header id="header" className="relative">
      <ShinyLine angle={"bottom"} />
      <div className="container p-0">
        <div className="flex justify-between">
          <ThemeToggle />
          <Navbar isOpen={isOpen} onNavigate={handleNavigation} />
          <MobileMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
          <Logo isDesktop />
        </div>
      </div>
    </header>
  );
};
export default Header;
