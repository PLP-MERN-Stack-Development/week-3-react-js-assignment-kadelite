import { useState, useEffect, useCallback } from "react";
import { fetchPosts, searchPosts } from "../utils/api";
import Button from "../components/Button";
import Card from "../components/Card";
import { useTheme } from "../contexts/ThemeContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  //const { theme } = useTheme(); // Keeping this in case you want to use it later

  // Wrap loadPosts in useCallback to prevent unnecessary recreations
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts(page);
      setPosts((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchPosts(searchQuery);
      setPosts(data);
      setPage(1); // Reset page when searching
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [loadPosts]); // Now includes loadPosts in dependencies

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Posts
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="rounded-l-none">
            Search
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchQuery("");
              setPage(1);
            }}
            className="ml-2"
          >
            Clear
          </Button>
        </div>
      </Card>

      {loading && page === 1 && (
        <Card>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        </Card>
      )}

      {error && (
        <Card>
          <p className="text-center text-red-600 dark:text-red-400">{error}</p>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
          </Card>
        ))}
      </div>

      {!searchQuery && posts.length > 0 && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Posts;
