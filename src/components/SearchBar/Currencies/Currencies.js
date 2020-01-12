import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as s from '../../../store/selectors';
import PropTypes from 'prop-types';
import * as actions from '../../../store/actions/app.actions';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		'& .MuiTextField-root': {
			width: '100%'
		}
	}
}));

const SearchBar = ({
	data,
	defaultRate,
	do_fetchMultipleRequestsFromServer,
	do_changeDefaultRate,
	currencies_types,
	currencies_rates
}) => {
	const [currenciesList, setCurrenciesList] = useState(['USD']);
	const [currency, setCurrency] = useState('USD');
	const classes = useStyles();

	useEffect(() => {
		setCurrenciesList(data);
	}, [data]);

	useEffect(() => {
		setCurrency(defaultRate);
	}, [defaultRate]);

	const handleChange = event => {
		setCurrency(event.target.value);
		getCurrenciesRates(event.target.value);
	};

	const getCurrenciesRates = currency => {
		const helper = {
			type: 'currencies_rates',
			params: { from: currencies_types, to: currency }
		};

		if (!currencies_rates.to[currency]) {
			do_fetchMultipleRequestsFromServer(helper);
		}

		do_changeDefaultRate(currency);
	};

	return (
		<Box data-aos="fade-left" data-aos-duration="2000">
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					{currenciesList && (
						<TextField
							id="standard-select-currency"
							select
							label="Select"
							value={currency}
							onChange={handleChange}
							helperText="Please select your currency"
						>
							{currenciesList.map(option => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					)}
				</div>
			</form>
		</Box>
	);
};

SearchBar.propTypes = {
	data: PropTypes.any,
	do_fetchMultipleRequestsFromServer: PropTypes.func,
	do_changeDefaultRate: PropTypes.func,
	isLoading: PropTypes.bool,
	error: PropTypes.string,
	defaultRate: PropTypes.string,
	currencies_types: PropTypes.any,
	currencies_rates: PropTypes.any
};

const mapStateToProps = state => {
	return {
		isLoading: s.selectorLoadingData(state, 'currencies_list'),
		data: s.selectorReceivingData(state, 'currencies_list'),
		error: s.selectorFetchingError(state, 'currencies_list'),
		defaultRate: s.selectorDefaultRate(state),
		currencies_types: s.selectorCurrenciesTypes(state),
		currencies_rates: s.selectorReceivingData(state, 'currencies_rates')
	};
};

const mapDispatchToProps = dispatch => {
	return {
		do_fetchMultipleRequestsFromServer: helper =>
			dispatch(actions.fetchMultipleRequestsFromServer(helper)),
		do_changeDefaultRate: currency => dispatch(actions.changeDefaultRate(currency))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

const Box = styled.div`
	width: 11rem;

	@media (max-width: 576px) {
		margin: 2.5rem 0;
	}
`;
