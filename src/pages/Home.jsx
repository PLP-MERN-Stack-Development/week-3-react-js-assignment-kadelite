import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome to Task Manager
          </h1>
          <Button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This is a simple task management application built with React,
          Tailwind CSS, and React Router for managing tasks.
          
        </p>

        <div className="flex space-x-4">
          <Link to="/tasks">
            <Button>Go to Tasks</Button>
          </Link>
          <Link to="/posts">
            <Button variant="secondary">View Posts</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
