import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Play, ArrowLeft, MessageCircle, Star, Clock, Film, Trash2, Calendar, Users } from "lucide-react";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=b918dc18&i=${id}`);
        const data = await res.json();

        if (data.Response === "False") {
          setError("Movie not found.");
          setMovie(null);
        } else {
          setMovie(data);

          // Load favorites
          const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
          setIsFavorite(savedFavorites.some((fav) => fav.imdbID === id));

          // Load feedbacks for this movie
          const savedFeedbacks = JSON.parse(localStorage.getItem(`feedbacks_${id}`)) || [];
          setFeedbacks(savedFeedbacks);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Handle favorite toggle
  const handleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      setIsFavorite(false);
    } else {
      savedFavorites.push(movie);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
  };

  // Open IMDb trailer page
  const handleTrailer = () => {
    const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}/`;
    window.open(imdbUrl, "_blank");
  };

  // Go back
  const handleBack = () => navigate(-1);

  // Add feedback
  const handleAddFeedback = () => {
    if (!newFeedback.trim()) return;

    const updatedFeedbacks = [
      ...feedbacks,
      { id: Date.now(), text: newFeedback.trim(), date: new Date().toLocaleString() },
    ];

    setFeedbacks(updatedFeedbacks);
    setNewFeedback("");
    localStorage.setItem(`feedbacks_${id}`, JSON.stringify(updatedFeedbacks));
  };

  // Delete feedback
  const handleDeleteFeedback = (feedbackId) => {
    const updated = feedbacks.filter((f) => f.id !== feedbackId);
    setFeedbacks(updated);
    localStorage.setItem(`feedbacks_${id}`, JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl">{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section with Background */}
      <div className="relative h-96 overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
            alt={movie.Title}
            className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-black/70 transition-all z-10"
        >
          <ArrowLeft size={18} />
          <span className="font-semibold">Back</span>
        </button>

        {/* Movie Info Overlay */}
        <div className="relative h-full max-w-6xl mx-auto px-6 flex items-end pb-8">
          <div className="flex gap-6 items-end w-full">
            {/* Poster */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                alt={movie.Title}
                className="relative w-48 h-72 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
              />
            </div>

            {/* Title & Quick Info */}
            <div className="flex-1 text-white pb-4">
              <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">{movie.Title}</h1>
              <div className="flex items-center gap-4 text-lg mb-4 flex-wrap">
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <span className="flex items-center gap-1 bg-yellow-500/90 text-yellow-900 px-3 py-1 rounded-full font-bold">
                    <Star className="w-4 h-4 fill-yellow-900" />
                    {movie.imdbRating}
                  </span>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {movie.Runtime}
                  </span>
                )}
                {movie.Year && (
                  <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {movie.Year}
                  </span>
                )}
              </div>
              {movie.Genre && movie.Genre !== "N/A" && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {movie.Genre.split(", ").map((genre, idx) => (
                    <span key={idx} className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={handleFavorite}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              isFavorite
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <button
            onClick={handleTrailer}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Trailer
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Plot & Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Film className="w-6 h-6 text-purple-400" />
                  Synopsis
                </h2>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Feedbacks Section */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-400" />
                Community Feedback
              </h2>

              {/* Add Feedback */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                  onKeyDown={(e) => e.key === "Enter" && handleAddFeedback()}
                />
                <button
                  onClick={handleAddFeedback}
                  disabled={!newFeedback.trim()}
                  className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all ${
                    !newFeedback.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-purple-500 hover:to-pink-500"
                  }`}
                >
                  Post
                </button>
              </div>

              {/* Feedback List */}
              <div className="space-y-3">
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => (
                    <div
                      key={fb.id}
                      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className="text-gray-200 mb-2">{fb.text}</p>
                          <span className="text-xs text-gray-500">{fb.date}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteFeedback(fb.id)}
                          className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-8">No feedback yet. Be the first to share!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Movie Info Cards */}
          <div className="space-y-4">
            {movie.Director && movie.Director !== "N/A" && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  Director
                </h3>
                <p className="text-white">{movie.Director}</p>
              </div>
            )}

            {movie.Actors && movie.Actors !== "N/A" && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Cast
                </h3>
                <p className="text-white">{movie.Actors}</p>
              </div>
            )}

            {movie.Year && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Release Year</h3>
                <p className="text-white text-2xl font-bold">{movie.Year}</p>
              </div>
            )}

            {movie.Rated && movie.Rated !== "N/A" && (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Rating</h3>
                <p className="text-white text-2xl font-bold">{movie.Rated}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;