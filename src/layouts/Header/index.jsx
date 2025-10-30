import { useState } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import ShinyLine from "../../components/ShinyLine";

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
