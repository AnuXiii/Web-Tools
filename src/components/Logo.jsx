import logo from "/logo.png";

const Logo = ({ isDesktop }) => {
  return (
    <>
      <a
        href="/"
        data-route="/"
        className={`borderX flex items-center gap-3 p-4 text-xl font-bold max-lg:border-b lg:border-l lg:text-3xl ${isDesktop ? "max-lg:hidden" : "lg:hidden"}`}
        role="logo"
        aria-label="logo"
      >
        <img src={logo} alt="" />
        <span className="text-nowrap">
          <span className="text-primary">WEB</span> Tools
        </span>
      </a>
    </>
  );
};
export default Logo;
