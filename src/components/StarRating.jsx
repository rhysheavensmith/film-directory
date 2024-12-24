import { useState } from 'react';
import Star from './Star';

// Did a few inline styles for demonstration purposes
const StarRating = ({ maxRating = 10 }) => {
	const [rating, setRating] = useState(0);

	const handleClick = (index) => {
		setRating(index + 1);
	};
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						index={i}
						onRate={handleClick}
						key={i}
						isFull={rating >= i + 1}
					/>
				))}
			</div>
			<p style={{ lineHeight: 1, marign: 0 }}>{rating || ''}</p>
		</div>
	);
};

export default StarRating;
