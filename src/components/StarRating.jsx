import { useState } from 'react';
import Star from './Star';

// Did a few inline styles for demonstration purposes
const StarRating = ({
	maxRating = 10,
	color = '#fcc419',
	size = 48,
	onAddRating,
}) => {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	const handleClick = (index) => {
		onAddRating(index + 1);
		setRating(index + 1);
	};

	const handleEnterHoverState = (index) => {
		setHoverRating(index + 1);
	};

	const handleLeaveHoverState = () => {
		setHoverRating(0);
	};

	const textStyle = {
		lineHeight: 1,
		margin: 0,
		color: color,
		fontSize: `${size / 1.5}px`,
	};

	// useEffect(() => {
	// 	try {
	// 		if (rating === 0) return;
	// 		const currentStarRating = rating;
	// 		localStorage.setItem('starRating', currentStarRating);
	// 	} catch (error) {
	// 		console.log(`Error saving to local storage: ${error.message}`);
	// 	}
	// }, [rating]);

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
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={textStyle}>{rating || hoverRating || ''}</p>
		</div>
	);
};

export default StarRating;
