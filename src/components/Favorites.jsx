// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MovieCard from "../components/MovieCard"; 

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleBack = () => navigate(-1);

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        ❤️ My Favorite Movies
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
