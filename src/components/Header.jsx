import { Heart, Film } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-2xl">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-purple-300" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
            Movie List
          </h1>
        </div>

        {/* Favorites link */}
        <Link
          to="/favorites"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transform transition-all duration-300 ease-out"
        >
          <Heart className="w-5 h-5 fill-current" />
          <span>Favorites</span>
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
    </header>
  );
}

export default Header;
