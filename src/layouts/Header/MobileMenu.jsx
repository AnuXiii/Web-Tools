import { MenuIcon, XIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const MobileMenu = ({ isOpen, onToggle }) => {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <button
      className={`flex-center borderX z-51 border-l p-4 lg:hidden ${isOpen ? "bg-primary text-white" : "text-base-content bg-transparent"}`}
      aria-label="open menu"
      onClick={onToggle}
    >
      {isOpen ? <XIcon size={40} /> : <MenuIcon size={40} />}
    </button>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default MobileMenu;
