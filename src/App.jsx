import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Favorites from "./components/Favorites";

const API_URL = "https://www.omdbapi.com/?apikey=b918dc18";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
          .catch((err) => console.error("❌ SW registration failed:", err));
      });
    }

    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(`${API_URL}&s=${searchTerm}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background decorative layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-slate-900/40 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-10 -z-10"></div>

        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 animate-fadeIn">
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onSearch={fetchMovies}
                    />
                  </div>
                  <MovieList movies={movies} />
                </>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
