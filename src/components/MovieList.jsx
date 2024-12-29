import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Button from './Button';

import LoadingSpinner from './LoadingSpinner';

const MovieList = ({ movies }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// function to set a timeout to allow the component to render
	// does not need to be in useEffect because it is not
	// dependent on anything outside of the component
	const toggleList = () => {
		if (!isOpen) {
			setIsLoading(true);
			setTimeout(() => {
				setIsOpen(true);
				setIsLoading(false); // Open the list after a delay
			}, 1000); // Adjust delay as to qllow the animation to render
		} else {
			setIsOpen(false);
		}
	};

	// Define animation variants for the list items
	const itemVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className='box'>
			<Button className='btn-toggle' onClick={toggleList}>
				{isOpen ? '–' : '+'}
			</Button>
			<AnimatePresence>
				{isOpen ? (
					!movies?.length ? ( // Check if movies array is empty
						<div style={{ textAlign: 'center', marginTop: '1rem' }}>
							<p style={{ textAlign: 'center', opacity: 0.7 }}>
								Search for a movie to see results!
							</p>
						</div>
					) : (
						<motion.ul
							className='list list-motion'
							initial='hidden'
							exit='hidden'
							animate='visible'
							layout
							variants={{
								hidden: {
									opacity: 0,
									transition: { staggerChildren: 0.3, staggerDirection: -1 },
								},
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.3, staggerDirection: 1 },
								},
							}}
						>
							{movies.map((movie) => (
								<motion.li
									key={movie.imdbID}
									variants={itemVariants}
									whileHover={{ scale: 1.05, cursor: 'pointer' }}
									transition={{ type: 'spring', stiffness: 200 }}
								>
									<img src={movie.Poster} alt={`${movie.Title} poster`} />
									<h3>{movie.Title}</h3>
									<div>
										<p style={{ opacity: 0.7, marginTop: '0.5rem' }}>
											<span>{movie.Year}</span>
										</p>
									</div>
								</motion.li>
							))}
						</motion.ul>
					)
				) : isLoading ? (
					<div className='loader'>
						<LoadingSpinner />
					</div>
				) : null}
			</AnimatePresence>
		</div>
	);
};

export default MovieList;
