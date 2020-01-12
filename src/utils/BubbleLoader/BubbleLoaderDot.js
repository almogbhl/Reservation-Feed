import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const BubbleLoaderDot = ({ delay }) => {
	return <Dot delay={delay} />;
};

export default BubbleLoaderDot;

const loading = keyframes`
    0%,
    80%,
    100% {
          opacity: 0;
    }
    40% {
          opacity: 1;
          background-color: darkred;
    }
`;

BubbleLoaderDot.propTypes = {
	delay: PropTypes.string
};

const Dot = styled.div`
	height: 28px;
	width: 28px;
	border-radius: 50%;
	background-color: #3498db;
	margin-right: 5px;
	animation: ${loading} 1s ${props => props.delay}s infinite ease-in-out;
`;
