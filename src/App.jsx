import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=b918dc18';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Avengers');

  useEffect(() => {
    // Register the service worker once
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('✅ Service Worker registered:', registration.scope);
          })
          .catch((error) => {
            console.error('❌ Service Worker registration failed:', error);
          });
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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={fetchMovies}
      />
      <MovieList movies={movies} />
      <Footer />
    </div>
  );
}

export default App;
