import PropTypes from "prop-types";
import { features } from "../../constants";

const Cards = ({ start, end }) => {
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

Cards.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
};

export default Cards;
