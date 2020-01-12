import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as s from '../../store/selectors';
import Item from './Item';
import PropTypes from 'prop-types';
import BubbleLoader from '../../utils/BubbleLoader/BubbleLoader';

const List = ({
	reservation_list,
	currencies_error,
	reservation_error,
	reservation_isLoading,
	currencies_isLoading,
	hotels_list,
	defaultRate,
	currencies_rates
}) => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	// handle errors
	//--------------
	useEffect(() => {
		setError(currencies_error);
	}, [currencies_error]);

	useEffect(() => {
		setError(reservation_error);
	}, [reservation_error]);

	// handle loading
	//--------------
	useEffect(() => {
		if (currencies_isLoading === true || reservation_isLoading === true) {
			setLoading(true);
		}

		if (currencies_isLoading === false && reservation_isLoading === false) {
			setLoading(false);
		}
	}, [reservation_isLoading, currencies_isLoading]);

	// handle lists
	//--------------
	useEffect(() => {
		if (reservation_list && currencies_rates) {
			setData(reservation_list);
		}
	}, [reservation_list, currencies_rates]);

	// handle default rate
	//--------------------
	useEffect(() => {
		if (currencies_isLoading === false && reservation_isLoading === false) {
			setLoading(false);
		}
	}, [defaultRate]);

	// print list
	//--------------------
	const printList = () => {
		if (error) return <ErrMsg>{error}</ErrMsg>;
		if (loading) return <BubbleLoader />;

		if (data)
			return data
				.map(reservation => (
					<Item
						key={reservation.id ? reservation.id : reservation.uuid}
						details={reservation}
						hotels_list={hotels_list}
						defaultRate={defaultRate}
						currencyRate={currencies_rates}
					/>
				))
				.reverse();
	};

	return <Ul>{printList()}</Ul>;
};

List.propTypes = {
	reservation_list: PropTypes.any,
	currencies_rates: PropTypes.any,
	defaultRate: PropTypes.string,
	hotels_list: PropTypes.any,
	reservation_isLoading: PropTypes.bool,
	currencies_isLoading: PropTypes.bool,
	currencies_error: PropTypes.string,
	reservation_error: PropTypes.string
};

const mapStateToProps = state => {
	return {
		// is loading
		reservation_isLoading: s.selectorLoadingData(state, 'reservations_list'),
		currencies_isLoading: s.selectorLoadingData(state, 'currencies_rates'),
		// lists
		reservation_list: s.selectorReceivingData(state, 'reservations_list').filtered_list,
		hotels_list: s.selectorReceivingData(state, 'hotels_list'),
		// errors
		currencies_error: s.selectorFetchingError(state, 'currencies_rates'),
		reservation_error: s.selectorFetchingError(state, 'reservations_list'),
		// rates
		defaultRate: s.selectorDefaultRate(state),
		currencies_rates: s.selectorReceivingData(state, 'currencies_rates')
	};
};

export default connect(mapStateToProps)(List);

const Ul = styled.ul`
	border-radius: 0.4rem;
	padding: 0;
`;

const ErrMsg = styled.h1`
	margin: 0 auto;
	margin-top: 10%;
	color: tomato;
`;
