import React from 'react';
import styled from 'styled-components';

const CloseIconWrapper = styled.div`
	width: 100%;
`;

const StyledCloseIcon = styled.i`
	float: right;
	margin: 4% 4% 0 0;

	&:hover {
		cursor: pointer;
	}
	&:active {
		color: black;
		cursor: pointer;
	}
`;

export const CloseIcon = ({ onClick }) => {
	return <CloseIconWrapper>
		<StyledCloseIcon className="far fa-times-circle" onClick={onClick} />
	</CloseIconWrapper>;
};