import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
	padding: 0 5vw;
`;

export const Photo = styled.div`
	width: 100%;
	cursor: pointer;
	img {
		height: 100%;
		width: 100%;
	}
`;

export const Modal = styled.div`
	display: block;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.9);
`;

export const ModalContent = styled.div`
	margin: auto;
	display: block;
	padding: 2rem;
	background-color: #fff;
	height: 100vh;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

export const Close = styled.span`
	color: #000;
	font-size: 2rem;
	font-weight: bold;
	position: absolute;
	top: 0;
	right: 0;
	padding: 1rem;
	cursor: pointer;
`;
