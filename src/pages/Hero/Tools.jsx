import Button from "../../components/Button";
import { features } from "../../constants";
import { Dot } from "lucide-react";

const Tools = () => {
  return features.slice(1).map(({ name, path, icon: Icon }) => {
    return (
      <li key={path} className="group relative w-full" title={name}>
        <div className="text-base-content/70 pointer-events-none absolute inset-0 grid scale-150 grid-cols-2 items-center justify-between duration-150 group-hover:scale-130">
          {[...Array(4)].map((_, i) => (
            <Dot
              key={i}
              size={28}
              className="flex-center justify-self-center"
            />
          ))}
        </div>
        <Button
          tag="a"
          text=""
          path={path}
          customClasses={
            "border border-base-content/20 text-base-content bg-base-100 py-6 hover:opacity-100 [&>svg]:size-12"
          }
          icon={Icon}
        />
      </li>
    );
  });
};
export default Tools;
