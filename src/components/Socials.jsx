import { socials } from "../constants";

const Socials = () => {
  return (
    <ul className="flex-center borderX gap-5 p-4 md:border-l">
      {socials.map(({ name, icon: Icon, link }) => (
        <li key={name}>
          <a
            href={link}
            target="_blank"
            rel="noopener"
            aria-label={`${name} social page`}
            className="bg-base-100 flex-center text-base-content hover:border-base-content hover:text-base-100 hover:bg-base-content border-base-content/20 rounded-lg border p-2 duration-200"
          >
            <Icon size={32} />
          </a>
        </li>
      ))}
    </ul>
  );
};
export default Socials;
