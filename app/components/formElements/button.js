import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	width: 25%;
	color: ${(props) => props.theme.darkTextColor};
	border: 2px solid ${(props) => props.theme.accentColor};
	background-color: ${(props) => props.theme.buttonColor};
	border-radius: 15px;
	margin: 5px auto;
	padding: 5px 2.5px;
	cursor: pointer;
	box-sizing: border-box;
	&:hover {
		background-color: ${(props) => props.theme.onHoverColor};
	}
	&:active {
		background-color: ${(props) => props.theme.onActiveColor};
	}
	&:focus {
		outline: 0;
		box-shadow: 0 0 2pt 1pt ${(props) => props.theme.inputFocusColor};
	}
`;

export default class FormButton extends React.Component {
	render() {
		const { name, onClick, text, type } = this.props;

		const buttonProps = { name, onClick, type };
		
		return <StyledButton {...buttonProps} readOnly>{text}</StyledButton>;
	}
}