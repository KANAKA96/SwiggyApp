import { LOG_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between bg-gray-300 shadow-md sm:bg-yellow-50 lg:bg-green-50">
      <div>
        <img className="w-28" src={LOG_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex  p-4">
          <li className="m-2">
            <Link to="/">Home</Link>
          </li>
          <li className="m-2">
            <Link to="/about">About us</Link>
          </li>
          <li className="m-2">Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
