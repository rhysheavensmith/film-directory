import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Button from './Button';

// calculate the average of an array of numbers
const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedList = ({ watched }) => {
	// set the initial state of the component to be open
	const [isOpen, setIsOpen] = useState(true);
	// calculate the average IMDb rating, user rating, and runtime of the watched movies
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

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
					<>
						<motion.div
							className='summary'
							initial='hidden'
							exit='hidden'
							animate='visible'
							repeat={1}
							repeatType='reverse'
							variants={{
								hidden: { opacity: 0, x: -20 },
								visible: { opacity: 1, x: 0, transition: { duration: 1 } },
							}}
						>
							<h2>Movies you watched</h2>
							<div>
								<p>
									<span>#️⃣</span>
									<span>{watched.length} movies</span>
								</p>
								<p>
									<span>⭐️</span>
									<span>{avgImdbRating}</span>
								</p>
								<p>
									<span>🌟</span>
									<span>{avgUserRating}</span>
								</p>
								<p>
									<span>⏳</span>
									<span>{avgRuntime} min</span>
								</p>
							</div>
						</motion.div>

						<motion.ul
							className='list'
							initial='hidden'
							animate='visible'
							repeat={1}
							repeatType='reverse'
							exit='hidden'
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
							{watched.map((movie) => (
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
											<span>⭐️</span>
											<span>{movie.imdbRating}</span>
										</p>
										<p>
											<span>🌟</span>
											<span>{movie.userRating}</span>
										</p>
										<p>
											<span>⏳</span>
											<span>{movie.runtime} min</span>
										</p>
									</div>
								</motion.li>
							))}
						</motion.ul>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default WatchedList;
