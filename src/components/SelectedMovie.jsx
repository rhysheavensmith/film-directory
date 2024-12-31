import { AnimatePresence, motion } from 'motion/react';

import StarRating from './StarRating';

const itemVariants = {
	hidden: {
		opacity: 0,
		y: -20,
		transition: { type: 'spring', stiffness: 200, duration: 0.4 },
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 200, duration: 0.4 },
	},
};

const SelectedMovie = ({ movieId, onClose }) => {
	return (
		<AnimatePresence>
			<motion.div
				className='details'
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={itemVariants}
				repeat={1}
				repeatType='reverse'
			>
				<button className='btn-back' onClick={onClose}>
					&larr;
				</button>
				<div>
					<h1>{movieId}</h1>
					<StarRating size={24} />
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default SelectedMovie;
