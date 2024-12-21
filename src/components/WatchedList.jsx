import { useState } from 'react';
import { motion } from 'motion/react';
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
			{isOpen && (
				<>
					<div className='summary'>
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
					</div>

					<motion.ul
						className='list'
						initial='hidden'
						exit='hidden'
						animate='visible'
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
						}}
					>
						{watched.map((movie) => (
							<motion.li key={movie.imdbID} variants={itemVariants}>
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
		</div>
	);
};

export default WatchedList;
