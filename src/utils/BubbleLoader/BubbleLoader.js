import React from 'react';
import styled from 'styled-components';
import BubbleLoaderDot from './BubbleLoaderDot';

const BubbleLoader = () => {
	return (
		<LoaderBox>
			<BubbleLoaderDot delay="0" />
			<BubbleLoaderDot delay="-0.16" />
			<BubbleLoaderDot delay="-0.32" />
		</LoaderBox>
	);
};

export default BubbleLoader;

const LoaderBox = styled.div`
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	margin-top: 20%;
`;
