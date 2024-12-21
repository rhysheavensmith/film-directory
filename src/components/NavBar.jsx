import { useState } from 'react';
import { motion } from 'motion/react';

const NavBar = ({ numMovies }) => {
	const [query, setQuery] = useState('');
	return (
		<motion.nav
			className='nav-bar'
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 20 }}
		>
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
		</motion.nav>
	);
};

export default NavBar;
