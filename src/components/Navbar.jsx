import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          ArticleHub
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">Articles</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/create">Create Article</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
