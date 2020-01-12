import React from 'react';
import styled from 'styled-components';

const Header = () => {
	return (
		<Title data-aos="fade-down" data-aos-duration="2000">
			UpStay Reservations
		</Title>
	);
};

export default Header;

const Title = styled.h1`
	margin: 10px auto;

	@media (max-width: 576px) {
		margin: 1rem 2rem;
	}
`;
