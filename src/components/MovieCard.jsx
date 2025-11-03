function MovieCard({ movie }) {
	const handleClick = () => {
		// This will open a YouTube search for the trailer
		const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
			movie.Title + ' trailer'
		)}`;
		window.open(youtubeSearchUrl, '_blank');
	};

	return (
		<div
			onClick={handleClick}
			className="bg-white p-2 rounded shadow cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
		>
			<img
				src={
					movie.Poster !== 'N/A'
						? movie.Poster
						: 'https://via.placeholder.com/200'
				}
				alt={movie.Title}
				className="w-full rounded"
			/>
			<h2 className="text-center mt-2 font-semibold">{movie.Title}</h2>
			<p className="text-center text-gray-500">{movie.Year}</p>
		</div>
	);
}

export default MovieCard;
