import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${(props) => props.theme.backgroundColor};
    border-color: ${(props) => props.theme.borderColor};
    border-radius: 7px;
    border-width: 1px;
    box-shadow: 3px 3px ${(props) => props.theme.lightAccentColor};
    color: ${(props) => props.theme.textColor};
    margin: 10px;
	padding: 10px;
    width: 100%;

    &:hover {
        background-color: ${(props) => props.theme.lightAccentColor};
        box-shadow: 1px 1px ${(props) => props.theme.lightAccentColor};
        color: ${(props) => props.theme.backgroundColor};
        transform: translate(2px, 2px);
    }
`;

export default class FormButton extends React.Component {
	render() {
		const { name, onClick, text, type } = this.props;

		const buttonProps = { name, onClick, type };
		
		return <StyledButton {...buttonProps} readOnly>{text}</StyledButton>;
	}
}