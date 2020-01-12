import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import List from '../Reservations/List';
import { subscribeToSocketio } from '../../utils/services/api';
import PropTypes from 'prop-types';
import * as s from '../../store/selectors';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
	addNewReservation,
	fetchDataFromServer,
	fetchMultipleRequestsFromServer
} from '../../store/actions/app.actions';

const App = ({
	do_fetchDataFromServer,
	do_addNewReservation,
	currencies_types,
	do_fetchMultipleRequestsFromServer,
	defaultRate
}) => {
	useEffect(() => {
		// initial
		onLoad();

		// animation library
		AOS.init();
	}, []);

	useEffect(() => {
		getCurrenciesRates();
	}, [currencies_types]);

	const onLoad = () => {
		do_fetchDataFromServer('reservations_list');
		do_fetchDataFromServer('hotels_list');
		do_fetchDataFromServer('currencies_list');
		subscribeToSocketio(listenToLiveFeed);
	};

	const listenToLiveFeed = (err, newReservation) => {
		if (err) console.log(`[error]: listenToLiveFeed - ${err}`);

		do_addNewReservation(newReservation);
	};

	const getCurrenciesRates = () => {
		const helper = {
			type: 'currencies_rates',
			params: { from: currencies_types, to: defaultRate }
		};

		if (currencies_types) do_fetchMultipleRequestsFromServer(helper);
	};

	return (
		<Container>
			<Header />
			<Main>
				<SearchBar />
				<List />
			</Main>
		</Container>
	);
};

App.propTypes = {
	do_fetchDataFromServer: PropTypes.func,
	do_fetchMultipleRequestsFromServer: PropTypes.func,
	do_addNewReservation: PropTypes.func,
	defaultRate: PropTypes.string,
	currencies_types: PropTypes.any
};

const mapStateToProps = state => {
	return {
		currencies_types: s.selectorCurrenciesTypes(state),
		defaultRate: s.selectorDefaultRate(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		do_fetchDataFromServer: type => dispatch(fetchDataFromServer(type)),
		do_fetchMultipleRequestsFromServer: helper =>
			dispatch(fetchMultipleRequestsFromServer(helper)),
		do_addNewReservation: reservation => dispatch(addNewReservation(reservation))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Main = styled.main`
	padding: 2rem;
`;
