import React from 'react';
import styled from 'styled-components';

import { clickedInsideContainer } from '../utilities/DOMHelper.js';

const CenteredBox = styled.div`
	background-color: ${(props) => props.theme.backgroundColor};
	border: 2px solid ${(props) => props.theme.accentColor};
	border-radius: 25px;
	box-sizing: border-box;
	color: ${(props) => props.theme.textColor};
	display: flex;
	flex-direction: column;
	grid-row: 2;
	grid-column: 2;
	height: 100%;
	user-select: none;
	width: 100%;
`;

const OpaqueBackground = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	background-color: ${(props) => props.theme.textColor};
	opacity: 0.5;
	z-index: 100;
`;

const PopupContainer = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	display: grid;
	grid-template-columns: 35% auto 35%;
	grid-template-rows: 20% auto 20%;
	z-index: 101;
`;

export default class CenterPanel extends React.Component {
	constructor(props) {
		super(props);

		this.handleCloseFromClickOutside = this.handleCloseFromClickOutside.bind(this);
	}

	handleCloseFromClickOutside(e) {
		const { handleClose, id } = this.props;
		const container = document.getElementById(id);
		!clickedInsideContainer(e, container) && handleClose();
	}

	render() {
		const { content, handleClose, id } = this.props;

		return <React.Fragment>
			<OpaqueBackground />
			<PopupContainer onMouseDown={this.handleCloseFromClickOutside}>
				<CenteredBox id={id}>
					{content}
				</CenteredBox>;
			</PopupContainer>
		</React.Fragment>;
	}
}