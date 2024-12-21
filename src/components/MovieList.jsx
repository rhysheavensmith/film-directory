import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Button from './Button';

const MovieList = ({ movies }) => {
	const [isOpen, setIsOpen] = useState(false);

	// Define animation variants for the list items
	const itemVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className='box'>
			<Button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</Button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						className='list'
						initial='hidden'
						exit='hidden'
						animate='visible'
						repeat={1}
						repeatType='reverse'
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
						{movies?.map((movie) => (
							<motion.li
								key={movie.imdbID}
								variants={itemVariants}
								whileHover={{ scale: 1.05, cursor: 'pointer' }}
								transition={{ type: 'spring', stiffness: 200 }}
							>
								<img src={movie.Poster} alt={`${movie.Title} poster`} />
								<h3>{movie.Title}</h3>
								<div>
									<p>
										<span>🗓</span>
										<span>{movie.Year}</span>
									</p>
								</div>
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MovieList;
