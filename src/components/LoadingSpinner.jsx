import { motion } from 'motion/react';

const LoadingSpinner = () => {
	return (
		<div
			style={{
				width: '100px',
				height: '100px',
				margin: 'auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<motion.div
				animate={{ rotate: 360 }} // Continuous rotation
				transition={{
					duration: 1, // 1 second per rotation
					repeat: Infinity, // Infinite looping
					ease: 'linear', // Smooth, constant speed
				}}
				style={{
					width: '80px',
					height: '80px',
					border: '8px solid rgba(0, 0, 0, 0)',
					borderTop: '8px solid #7950f2', // Purple accent
					borderRadius: '50%', // Circular shape
				}}
			/>
		</div>
	);
};

export default LoadingSpinner;
