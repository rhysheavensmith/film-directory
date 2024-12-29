import { useRef } from 'react';

import { motion } from 'motion/react';

const NavBar = ({ numMovies, onSearch }) => {
	const searchRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchRef.current.value);
	};

	// added a few inline styles for demonstration purposes
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
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '2rem',
					overflow: 'hidden',
					justifyContent: 'space-between',
				}}
			>
				<form onSubmit={handleSubmit}>
					<input
						className='search'
						type='text'
						placeholder='Search movies...'
						ref={searchRef}
					/>
					<button
						style={{
							padding: '0.8rem 3rem',
							fontSize: '1.3rem',
							fontWeight: 'bold',
							backgroundColor: '#7950f2',
							border: 'none',
							borderRadius: '0.5rem',
							color: '#dee2e6',
							focus: 'none',
							cursor: 'pointer',
						}}
					>
						Search
					</button>
				</form>
			</div>

			<p className='num-results'>
				Found <strong>{numMovies}</strong> results
			</p>
		</motion.nav>
	);
};

export default NavBar;
