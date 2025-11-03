import { Film, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-purple-800 via-pink-700 to-red-600 text-white py-6 shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="font-semibold">Movie List App</span>
        </div>

        <p className="text-sm text-white/80">© 2025 All rights reserved.</p>

        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-red-400 animate-bounce" />
          <span className="text-sm text-white/80">Made with love by Movie Lovers</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
