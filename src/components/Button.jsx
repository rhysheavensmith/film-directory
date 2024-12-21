import { motion } from 'framer-motion';

const Button = ({ children, ...props }) => {
	return (
		<motion.button
			{...props}
			whileHover={{ rotate: 360 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.button>
	);
};

export default Button;
