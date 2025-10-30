import ShinyLine from "../../components/ShinyLine";
import Socials from "./Socials";

const Footer = () => {
  return (
    <footer id="footer" className="relative">
      <ShinyLine angle={"top"} />
      <div className="container p-0">
        <div className="flex items-center justify-between max-md:flex-col">
          <div className="borderX flex-center h-full p-4 text-center text-sm max-md:border-b md:border-r">
            <p className="p-4">
              All rights recived &copy; {new Date().getFullYear()}
            </p>
          </div>
          <Socials />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
