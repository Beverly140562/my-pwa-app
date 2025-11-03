import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-md mx-auto bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 p-1 rounded-full shadow-lg m-5"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
        className="flex-1 px-4 py-2 rounded-full outline-none bg-white text-gray-800 placeholder-gray-400 shadow-inner focus:ring-2 focus:ring-purple-400 transition-all"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-purple-50 transition-all"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
