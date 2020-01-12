import React from 'react';
import styled from 'styled-components';
import Currencies from './Currencies/Currencies';
import SearchInput from './SearchInput/SearchInput';

const SearchBar = () => {
	return (
		<Box>
			<SearchInput />
			<Currencies />
		</Box>
	);
};

export default SearchBar;

const Box = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;

	@media (max-width: 576px) {
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}
`;
