import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import WatchedList from './components/WatchedList';
import Main from './components/Main';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(() => {
		try {
			const savedList = localStorage.getItem('watched');
			if (savedList) {
				return JSON.parse(savedList);
			}
		} catch (error) {
			console.log(`Error loading from local storage: ${error.message}`);
			return [];
		}
		return [];
	});
	const [numMovies, setNumMovies] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [movieId, setMovieId] = useState(null);

	// Handle search query
	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	// Update the number of movies when the movies array changes
	useEffect(() => {
		setNumMovies(movies.length);
	}, [movies]);

	// fetch movie details
	useEffect(() => {
		// AbortController to cancel fetch request
		const controller = new AbortController();
		const signal = controller.signal;

		// Fetch movies from the API
		const fetchMovies = async (query) => {
			try {
				setLoading(true);
				setFetchError(null); // Reset fetch error
				setMovieId(null); // Reset movie ID
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

	// save the watched list to local storage
	useEffect(() => {
		try {
			const watchedList = JSON.stringify(watched);
			localStorage.setItem('watched', watchedList);
		} catch (error) {
			console.log(`Error saving to local storage: ${error.message}`);
		}
	}, [watched]);

	// function to set the movie ID
	const handleMovieId = (id) => {
		setMovieId((prevId) => (prevId === id ? null : id));
	};

	const handleCloseMovie = () => {
		setMovieId(null);
	};

	const handleAddMovie = (movie) => {
		setWatched((prevWatched) => [...prevWatched, movie]);
	};

	const handleDeleteMovie = (id) => {
		setWatched((prevWatched) =>
			prevWatched.filter((movie) => movie.imdbID !== id)
		);
	};

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
						<MovieList movies={movies} onSelectMovie={handleMovieId} />
						<WatchedList
							watched={watched}
							currentMovie={movieId}
							goBack={handleCloseMovie}
							onAddMovie={handleAddMovie}
							onSelectMovie={handleMovieId}
							onDeleteMovie={handleDeleteMovie}
						/>
					</>
				)}
			</Main>
		</>
	);
}
