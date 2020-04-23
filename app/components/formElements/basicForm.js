import React from 'react';
import styled from 'styled-components';

import FormButton from './button';

const Form = styled.form`
    padding: 0 10%;
    text-align: center;
`;

const Title = styled.h1`
    text-align: center;
	margin: 0;
	padding: 0 0 10px 0;
`;

export const BasicForm = (props) => {
    const { inputs, onSubmit, title } = props;

    return <div>
        <Title>{title}</Title>
        <Form onSubmit={onSubmit}>
            {inputs}
            <FormButton text="Submit" type="submit" />
        </Form>
    </div>
};