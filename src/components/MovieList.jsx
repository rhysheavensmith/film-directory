import { useState } from 'react';
import { motion } from 'motion/react';
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
			{isOpen && (
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
					{movies?.map((movie) => (
						<motion.li key={movie.imdbID} variants={itemVariants}>
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
		</div>
	);
};

export default MovieList;
