import styled from 'styled-components';

export const NavWrapper = styled.div`
	display: flex;
	min-height: 15vh;
	justify-content: space-between;
	align-items: center;
	font-size: 1rem;
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 1.5rem;
	a {
		font-size: 1.2rem;
		font-weight: 600;
	}
`;

export const NavItems = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;

	h3 {
		font-size: 1rem;
		padding: 0.25rem;
	}

	svg {
		font-size: 1.25rem;
	}

	span {
		background: #ff2626;
		color: #fff;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 0.7rem;
		position: absolute;
		top: -20%;
		right: -10%;
	}
`;

export const Item = styled.div`
	margin-left: 3rem;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
`;
