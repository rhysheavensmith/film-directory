import { useState } from 'react';

const NavBar = ({ numMovies }) => {
	const [query, setQuery] = useState('');
	return (
		<nav className='nav-bar'>
			<div className='logo'>
				<span role='img'>🍿</span>
				<h1>Film Findr.</h1>
			</div>
			<input
				className='search'
				type='text'
				placeholder='Search movies...'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<p className='num-results'>
				Found <strong>{numMovies}</strong> results
			</p>
		</nav>
	);
};

export default NavBar;
