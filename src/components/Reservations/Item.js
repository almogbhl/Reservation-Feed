import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

const Item = ({ details, hotels_list, currencyRate, defaultRate }) => {
	const { uuid, hotel_id, price, arrival_date, room_name, nights, currency } = details;

	const hotel_name = hotels_list ? hotels_list[hotel_id] : hotel_id;
	const check_in = moment(arrival_date).format('DD MMM, YYYY');
	const calc_check_out = new Date(arrival_date).setDate(
		new Date(arrival_date).getDate() + Number(nights)
	);
	const check_out = moment(calc_check_out).format('DD MMM, YYYY');
	const validCurrency = currency.toUpperCase();

	let currency_price = price;

	if (validCurrency !== defaultRate) {
		if (currencyRate.to[defaultRate]) {
			currency_price = (
				price * currencyRate.to[defaultRate].from[validCurrency].rate
			).toFixed(2);
		}
	}

	return (
		<Li
			data-aos="fade-up"
			data-aos-offset="-500"
			data-aos-delay="20"
			data-aos-duration="1000"
			data-aos-easing="ease-in-out"
			data-aos-mirror="true"
			data-aos-once="false"
			data-aos-anchor-placement="top-center"
		>
			<PriceBox>
				<PriceText>
					{currency_price} {defaultRate}
				</PriceText>
			</PriceBox>
			<MainBox>
				<InfoBox>
					<InfoDescription>Check-In</InfoDescription>
					<InfoText>{check_in}</InfoText>
				</InfoBox>
				<InfoBox>
					<InfoDescription>Cheack-Out</InfoDescription>
					<InfoText>{check_out}</InfoText>
				</InfoBox>
				<InfoBox>
					<InfoDescription>Hotel</InfoDescription>
					<InfoText>{hotel_name}</InfoText>
				</InfoBox>
				<InfoBox>
					<InfoDescription>Room</InfoDescription>
					<InfoText>{room_name}</InfoText>
				</InfoBox>
			</MainBox>
			<UuidBox>
				<UuidText>{uuid}</UuidText>
			</UuidBox>
		</Li>
	);
};

Item.propTypes = {
	details: PropTypes.object,
	hotels_list: PropTypes.object,
	currencyRate: PropTypes.object,
	defaultRate: PropTypes.string
};

export default Item;

const Li = styled.li`
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	border: 1px solid lightgray;
	margin-top: 1rem;
	box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
`;

const PriceBox = styled.div`
	flex-basis: 100%;
	margin-bottom: 0.5rem;
`;
const PriceText = styled.p`
	font-size: 1.8rem;
	text-align: end;

	@media (max-width: 1100px) {
		font-size: 1.4rem;
	}

	@media (max-width: 880px) {
		font-size: 1.1rem;
	}

	@media (max-width: 750px) {
		font-size: 1rem;
	}

	@media (max-width: 620px) {
		font-size: 0.9rem;
	}

	@media (max-width: 576px) {
		font-size: 1.5rem;
	}
`;
const UuidBox = styled.div`
	flex-basis: 100%;
	margin-top: 1rem;
`;
const UuidText = styled.p`
	font-size: 1rem;
	text-align: start;

	@media (max-width: 1100px) {
		font-size: 0.8rem;
	}

	@media (max-width: 576px) {
		text-align: center;
	}
`;

const MainBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid lightgrey;
	border-top: 1px solid lightgrey;
	padding: 1rem;

	@media (max-width: 576px) {
		border: none;

		flex-wrap: wrap;
	}
`;

const InfoBox = styled.div`
	flex-basis: 25%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-right: 1px solid lightgrey;

	&:nth-child(4) {
		border: none;
	}

	@media (max-width: 576px) {
		align-items: start;
		margin-top: 1rem;
		border: none;
		border-bottom: 1px solid lightgrey;

		&:nth-child(1),
		&:nth-child(2) {
			flex-basis: 50%;
		}

		&:nth-child(3),
		&:nth-child(4) {
			flex-basis: 100%;
		}
	}
`;
const InfoDescription = styled.p`
	color: silver;
	font-size: 1.2rem;

	@media (max-width: 1100px) {
		font-size: 1rem;
	}

	@media (max-width: 880px) {
		font-size: 0.9rem;
	}

	@media (max-width: 750px) {
		font-size: 0.8rem;
	}

	@media (max-width: 620px) {
		font-size: 0.7rem;
	}

	@media (max-width: 576px) {
		font-size: 1.2rem;
	}
`;
const InfoText = styled.p`
	font-size: 1.5rem;

	@media (max-width: 1100px) {
		font-size: 1.2rem;
	}

	@media (max-width: 880px) {
		font-size: 1rem;
	}

	@media (max-width: 750px) {
		font-size: 0.8rem;
	}

	@media (max-width: 620px) {
		font-size: 0.7rem;
	}

	@media (max-width: 576px) {
		font-size: 1.4rem;
	}
`;
