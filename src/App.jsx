import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import WatchedList from './components/WatchedList';
import Main from './components/Main';
import LoadingSpinner from './components/LoadingSpinner';

const tempMovieData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		Title: 'The Matrix',
		Year: '1999',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		Title: 'Parasite',
		Year: '2019',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
];

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
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);
	const [numMovies, setNumMovies] = useState(0);
	const [searchQuery, setSearchQuery] = useState('matrix');
	const [loading, setLoading] = useState(false);

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		setNumMovies(movies.length);
	}, [movies]);

	useEffect(() => {
		const fetchMovies = async (query) => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
				);
				const data = await response.json();
				if (data.Search) {
					setMovies(data.Search);
					setNumMovies(data.Search.length);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies(searchQuery);
	}, [searchQuery]);

	return (
		<>
			<NavBar
				numMovies={numMovies}
				onSearch={handleSearch}
				query={searchQuery}
			/>
			<Main>
				{loading ? (
					<LoadingSpinner />
				) : (
					<>
						<MovieList movies={movies} />
						<WatchedList watched={watched} />
					</>
				)}
			</Main>
		</>
	);
}
