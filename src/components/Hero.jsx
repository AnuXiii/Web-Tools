import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { features } from "../constants";
import Button from "./Button";
import TryModal from "./TryModal";
import { ExternalLink } from "lucide-react";

// render app features cards
const renderCards = (start, end) => {
  return [...features].slice(start, end).map(({ name, path, icon, colors }) => {
    const Icon = icon;
    const borderColorStyles = {
      borderColor: colors.borderColor,
    };

    return (
      <div
        key={name}
        style={borderColorStyles}
        className="flex-center group hover:border-primary! relative w-full rounded-lg border-2 border-b-5 border-solid p-4 duration-100 hover:scale-90 hover:-rotate-2 hover:border-b-2 md:h-60"
      >
        <div className="flex-center flex-col gap-5">
          <Icon
            size={60}
            stroke={`${colors.textColor}`}
            className="group-hover:stroke-primary duration-100 md:size-24"
          />
          <span className="text-center font-semibold md:text-xl">{name}</span>
        </div>
        <a
          href={path}
          data-route={path}
          aria-label={name}
          className="absolute inset-0"
        ></a>
      </div>
    );
  });
};

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsModalOpen(!!history.state?.isModal);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (!history.state?.isModal) {
      history.pushState(
        { ...history.state, isModal: true },
        null,
        location.pathname,
      );
    }
  };

  const squareBackground = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(139 92 246 / .1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
  };

  return (
    <section id="hero">
      <div className="pointer-events-none absolute inset-0 z-[-2] rounded-r-2xl md:w-1/2">
        <div
          style={squareBackground}
          className="absolute inset-0 bg-fixed"
        ></div>
        <div className="to-base-300 absolute inset-0 bg-linear-to-b from-transparent"></div>
      </div>
      <div className="container">
        {/*  */}
        <div className="grid grid-cols-1 items-center gap-15 md:grid-cols-2 md:gap-10">
          <div className="space-y-10">
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-pretty md:text-5xl">
                Try new Web API's now
              </h1>
              <p className="text-base-content/70 text-lg text-pretty">
                Explore powerful web APIs and innovative tools on your device.
                Use for free to enhance your creativity and discover new
                features.
              </p>
            </div>
            {/* open try modal button */}
            <Button
              text="Try now"
              icon={ExternalLink}
              onClick={handleOpenModal}
              customClasses={
                "bg-primary text-primary-content border-base-content/50 border-b-3"
              }
            />
          </div>
          <div className="relative flex flex-col gap-5 overflow-hidden">
            <div className="grid grid-cols-2 gap-5 overflow-hidden md:w-[1000px] md:-translate-x-80 md:grid-cols-4 max-md:[&>*:first-child]:hidden max-md:[&>*:last-child]:col-span-full">
              {renderCards(0, 4)}
            </div>
            <div
              className={`grid grid-cols-2 gap-5 overflow-hidden md:w-[1000px] md:-translate-x-35 md:grid-cols-4 max-md:[&>*:first-child]:hidden`}
            >
              {renderCards(3, 6)}
            </div>
          </div>
        </div>
        {/* create portal for try modal and portal it to body */}
        {isModalOpen &&
          ReactDOM.createPortal(
            <TryModal onClose={() => setIsModalOpen(false)} />,
            document.body,
          )}
        {/*  */}
      </div>
    </section>
  );
};

export default Hero;
