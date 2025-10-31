import { X } from "lucide-react";
import Button from "../../components/Button";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tools from "./Tools";

const TryModal = ({ onClose }) => {
  // close modal when popstate
  const handlePopState = () => {
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
    history.back();
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      onClick={(e) => e.target.role === "dialog" && handleCloseModal()}
      role="dialog"
      className="from-base-300 via-base-300 flex-center to-base-300/50 animate-fade-up fixed inset-0 z-60 bg-linear-to-t p-4 backdrop-blur-md"
    >
      <div className="space-y-10">
        <header className="flex-center justify-between gap-5">
          <p className="text-center text-2xl font-semibold">
            Choose one of the tool you want to use
          </p>
          <Button
            text=""
            background="bg-error"
            icon={X}
            onClick={() => handleCloseModal()}
            customClasses={
              "border-b-3 border-base-content/20 bg-error text-white hover:bg-error hover:opacity-90 px-3! py-2.5!"
            }
          />
        </header>
        <ul className="grid grid-cols-3 items-center justify-center gap-5 *:last:col-span-2">
          <Tools />
        </ul>
      </div>
    </div>
  );
};

TryModal.propTypes = {
  onClose: PropTypes.func,
};

export default TryModal;
