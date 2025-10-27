import { ArrowBigLeft } from "lucide-react";
import notFoundImg from "/not-found-img.svg";

const NotFound = () => {
  return (
    <section id="notFound">
      <div className="flex-center container flex-col px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-6xl">
          Page not found : (
        </h1>
        <a
          href="/"
          data-route="/"
          className="flex-center text-primary gap-2 text-lg hover:opacity-80"
        >
          <ArrowBigLeft />
          <span>Back to home</span>
        </a>
        <img src={notFoundImg} alt="not found image" className="size-full" />
      </div>
    </section>
  );
};
export default NotFound;
