import React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';

import TodoElement from '../todoElement';

const todoProps = {
    activeTab: 'Soon',
    id: 'todo_1',
    title: 'Testing',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget hendreit ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sit amet purus id lacus tincidunt pharetra.',
    datetime: '2020-04-22T21:47',
    draggable: 'true',
    onDragStart: action('starting drag'),
    onDragEnd: action('end drag'),
    onTodoCompleted: action('todo completed'),
    onEditClicked: action('now editing'),
    priority: 0
}

export default {
    title: 'TodoElement',
    component: TodoElement,
};

const FullHeightContainer = styled.div`
    height: 100vh;
`;

export const Basic = () => (
    <FullHeightContainer>
        <TodoElement {...todoProps} />
    </FullHeightContainer>
);

export const HighPriority = () => (
    <TodoElement {...todoProps} priority={1} />
);
