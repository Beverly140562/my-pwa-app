// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard"; // make sure path is correct

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-5">
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
