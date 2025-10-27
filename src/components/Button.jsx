import PropTypes from "prop-types";

const Button = ({
  tag = "button",
  path,
  id,
  text,
  icon: Icon,
  onClick,
  customClasses,
  children,
}) => {
  const Tag = tag;
  const linkProps = path && { href: path, "data-route": path };

  return (
    <Tag
      {...linkProps}
      {...(id && { id })}
      {...(onClick && { onClick })}
      className={`flex-center gap-3 rounded-lg border-solid px-6 py-3 text-xl font-semibold duration-100 select-none hover:opacity-90 active:translate-y-0.5 active:border-transparent active:opacity-80 ${customClasses}`}
      aria-label={text}
    >
      {text && <span>{text}</span>}
      {Icon && <Icon />}
      {children}
    </Tag>
  );
};

Button.propTypes = {
  tag: PropTypes.element,
  path: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  customClasses: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
