import React from 'react';
import styled from 'styled-components';

import { CompletedTodos } from '../completedTodos';
import { initialElementDicts } from '../helpers';

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
`;

export default {
    title: 'To-Do Scheduler/Completed Todos',
    component: CompletedTodos
}

const elementDicts = initialElementDicts();
elementDicts.Completed[1] = { title: 'Test 1' };
elementDicts.Completed[2] = { title: 'Test 2' };

export const Basic = () => ( 
    <FlexWrapper>
        <CompletedTodos elementDicts={elementDicts} />
    </FlexWrapper>
);