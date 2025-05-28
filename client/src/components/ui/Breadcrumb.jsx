import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600 max-w-screen-2xl mx-auto mt-8">
      <ol className="flex flex-wrap space-x-1 ml-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.to ? (
              <Link to={item.to} className="text-violet-500 font-semibold text-xl hover:text-violet-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-violet-700 font-semibold text-xl">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2 text-xl text-violet-700">{">"}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
