import { useState } from 'react';
import Star from './Star';

// Did a few inline styles for demonstration purposes
const StarRating = ({ maxRating = 10 }) => {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	const handleClick = (index) => {
		setRating(index + 1);
	};

	const handleEnterHoverState = (index) => {
		setHoverRating(index + 1);
	};

	const handleLeaveHoverState = () => {
		setHoverRating(0);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						index={i}
						onRate={handleClick}
						onHover={handleEnterHoverState}
						key={i}
						isFull={rating >= i + 1}
						isHovered={hoverRating >= i + 1}
						onLeaveHover={handleLeaveHoverState}
					/>
				))}
			</div>
			<p style={{ lineHeight: 1, marign: 0 }}>{rating || hoverRating || ''}</p>
		</div>
	);
};

export default StarRating;
