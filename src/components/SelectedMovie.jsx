import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import StarRating from './StarRating';
import LoadingSpinner from './LoadingSpinner';

const itemVariants = {
	hidden: {
		opacity: 0,
		y: -20,
		transition: { type: 'spring', stiffness: 200, duration: 0.4 },
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 200, duration: 0.4 },
	},
};

const API_KEY = import.meta.env.VITE_API_KEY;

const SelectedMovie = ({ movieId, onClose, onAddMovie }) => {
	const [fetchError, setFetchError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [movieDetails, setMovieDetails] = useState({});
	// fetch the movie details
	useEffect(() => {
		// AbortController to cancel fetch request
		const controller = new AbortController();
		const signal = controller.signal;

		// Fetch movies from the API
		const fetchMovieDetails = async (query) => {
			try {
				setLoading(true);
				setFetchError(null); // Reset fetch error
				const response = await fetch(
					`https://www.omdbapi.com/?i=${query}&apikey=${API_KEY}`,
					{ signal } // Pass the signal to the fetch request
				);

				// Check if the fetch request was aborted
				if (!response.ok) {
					throw new Error(`Failed to fetch movie details ${response.status}`);
				}

				const data = await response.json();

				if (data.response === 'False') {
					throw new Error(data.Error);
				}

				if (data) {
					// console.log(data);
					setMovieDetails(data);
					setLoading(false);
				} else {
					setMovieDetails({});
				}
			} catch (error) {
				if (error.name !== 'AbortError') {
					setFetchError(error.message);
				}
				// Handle other errors
			} finally {
				setLoading(false);
			}
		};

		fetchMovieDetails(movieId);

		// Cleanup function to cancel the fetch request
		return () => {
			controller.abort();
		};
	}, [movieId]);

	// Add the movie to the watched list
	const handleAddMovie = () => {
		const newMovie = {
			Title: movieDetails.Title,
			Year: movieDetails.Year,
			imdbRating: Number(movieDetails.imdbRating).toFixed(1),
			userRating: 0,
			runtime: movieDetails.Runtime.split(' ')[0],
			Poster: movieDetails.Poster,
			imdbID: movieDetails.imdbID,
		};
		onAddMovie(newMovie);
		onClose();
	};

	return (
		<AnimatePresence>
			<motion.div
				className='details'
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={itemVariants}
				repeat={1}
				repeatType='reverse'
			>
				{loading ? (
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<LoadingSpinner />
					</div>
				) : (
					<div className='details'>
						<header>
							<button className='btn-back' onClick={onClose}>
								&larr;
							</button>
							<img
								src={movieDetails.Poster}
								alt={`Poster of ${movieDetails.Title}`}
							/>
							<div className='details-overview'>
								<h2>{movieDetails.Title}</h2>
								<p>
									{movieDetails.Year} &bull; {movieDetails.Runtime}
								</p>
								<p>{movieDetails.Genre}</p>
								<p>
									<span>⭐️</span> {movieDetails.imdbRating} &bull;
									{' IMDB Rating'}
								</p>
							</div>
						</header>
						<section>
							<div className='rating'>
								<StarRating size={24} />
								<button onClick={handleAddMovie}>Add to Watched</button>
							</div>

							<p>
								<em>{movieDetails.Plot}</em>
							</p>
							<p>Starring: {movieDetails.Actors}</p>
							<p>Director: {movieDetails.Director}</p>
						</section>
					</div>
				)}
				{fetchError && (
					<div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
						<p>Error: {fetchError}</p>
						<button onClick={onClose}>Try Another Film</button>
					</div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default SelectedMovie;
