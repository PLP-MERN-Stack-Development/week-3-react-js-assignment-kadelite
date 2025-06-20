import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Task Manager
        </Link>
        <div className="flex space-x-4">
          <Link to="/">
            <Button variant="secondary" className="text-sm">
              Home
            </Button>
          </Link>
          <Link to="/tasks">
            <Button variant="secondary" className="text-sm">
              Tasks
            </Button>
          </Link>
          <Link to="/posts">
            <Button variant="secondary" className="text-sm">
              Posts
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
