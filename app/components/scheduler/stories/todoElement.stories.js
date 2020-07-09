import React from 'react';

import { action } from '@storybook/addon-actions';

import TodoElement from '../todoElement';

const todoProps = {
    activeTab: 'Soon',
    id: 'todo_1',
    title: 'Testing',
    text: 'Testing something something something',
    datetime: '2020-04-22T21:47',
    draggable: 'true',
    onDragStart: action('starting drag'),
    onDragEnd: action('end drag'),
    onTodoCompleted: action('todo completed'),
    onEditClicked: action('now editing'),
    priority: 0
}

export default {
    title: 'To-Do Scheduler/TodoElement',
    component: TodoElement,
};

export const Basic = () => (
    <TodoElement {...todoProps} />
);

export const HighPriority = () => (
    <TodoElement {...todoProps} priority={1} />
);
