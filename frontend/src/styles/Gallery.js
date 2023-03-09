import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Gallery = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	grid-gap: 1.5rem;
	margin-bottom: 50px;
`;
