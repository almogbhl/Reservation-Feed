import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { filterList } from '../../../store/actions/app.actions';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		'& > *': {
			width: '100%'
		}
	}
}));

const SearchInput = ({ do_filterList }) => {
	const classes = useStyles();

	const handle = e => {
		do_filterList(e.target.value);
	};

	return (
		<Box data-aos="fade-right" data-aos-duration="2000">
			<form className={classes.root} noValidate autoComplete="off">
				<TextField id="standard-basic" label="uuid" onChange={e => handle(e)} />
			</form>
		</Box>
	);
};

SearchInput.propTypes = {
	do_filterList: PropTypes.func
};

const mapDispatchToProps = dispatch => {
	return {
		do_filterList: value => dispatch(filterList(value))
	};
};

export default connect(null, mapDispatchToProps)(SearchInput);

const Box = styled.div`
	width: 30rem;

	@media (max-width: 770px) {
		width: 20rem;
	}
`;
