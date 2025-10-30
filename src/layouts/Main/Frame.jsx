import { Plus } from "lucide-react";

const Frame = () => {
  return (
    <>
      <div className="borderX pointer-events-none absolute inset-0 z-[-1] container scale-y-120 border-x"></div>
      <div className="pointer-events-none absolute inset-0 z-[-1] container grid grid-cols-2 place-content-between *:odd:-translate-x-8.5 *:odd:justify-self-start *:even:translate-x-8.5 *:even:justify-self-end">
        {[...Array(4)].map((_, i) => {
          const jumpTwo = Math.floor(i / 2) % 2 === 0;
          return (
            <i
              key={i}
              className={`flex-center bg-base-300 p-0.5 ${jumpTwo ? "-translate-y-8.5" : "translate-y-8.5"}`}
            >
              <Plus size={32} className="stroke-base-content/50" />
            </i>
          );
        })}
      </div>
    </>
  );
};
export default Frame;
