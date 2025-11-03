import React from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Eye } from "lucide-react";

function MovieCard({ movie }) {
  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

      <div className="relative">
        <div className="relative overflow-hidden">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450/1e293b/64748b?text=No+Poster"
            }
            alt={movie.Title}
            className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60"></div>

          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <Calendar className="w-3 h-3 text-purple-400" />
            <span className="text-white text-sm font-semibold">{movie.Year}</span>
          </div>

          {/* Rating placeholder */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-900 fill-yellow-900" />
            <span className="text-yellow-900 text-sm font-bold">8.5</span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-5 space-y-4">
          <h2 className="text-white text-xl font-bold line-clamp-2 min-h-14 leading-tight">
            {movie.Title}
          </h2>

          {/* View Details Button */}
          <Link
            to={`/movie/${movie.imdbID}`}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 hover:from-purple-500 hover:to-pink-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
}

export default MovieCard;
