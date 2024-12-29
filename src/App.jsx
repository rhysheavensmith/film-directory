import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import WatchedList from './components/WatchedList';
import Main from './components/Main';
import LoadingSpinner from './components/LoadingSpinner';

const tempWatchedData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);
	const [numMovies, setNumMovies] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(null);

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		setNumMovies(movies.length);
	}, [movies]);

	useEffect(() => {
		// AbortController to cancel fetch request
		const controller = new AbortController();
		const signal = controller.signal;

		// Fetch movies from the API
		const fetchMovies = async (query) => {
			try {
				setLoading(true);
				setFetchError(null); // Reset fetch error
				const response = await fetch(
					`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
					{ signal } // Pass the signal to the fetch request
				);

				// Check if the fetch request was aborted
				if (!response.ok) {
					throw new Error(`Failed to fetch movies ${response.status}`);
				}

				const data = await response.json();

				if (data.response === 'False') {
					throw new Error(data.Error);
				}

				if (data.Search) {
					setMovies(data.Search);
					setNumMovies(data.Search.length);
				} else {
					setMovies([]);
					setNumMovies(0);
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

		fetchMovies(searchQuery);

		// Cleanup function to cancel the fetch request
		return () => {
			controller.abort();
		};
	}, [searchQuery]);

	return (
		<>
			<NavBar numMovies={numMovies} onSearch={handleSearch} />
			<Main>
				{loading && <LoadingSpinner />}
				{fetchError && (
					<div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
						<p>Error: {fetchError}</p>
						<button onClick={() => handleSearch(searchQuery)}>Try Again</button>
					</div>
				)}
				{!loading && !fetchError && (
					<>
						<MovieList movies={movies} />
						<WatchedList watched={watched} />
					</>
				)}
			</Main>
		</>
	);
}
