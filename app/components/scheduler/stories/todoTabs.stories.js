import React from 'react';
import styled from 'styled-components';

import { Tab, TodoTabs } from '../todoTabs';
import { tabHeaders } from '../helpers';

const TabWrapper = styled.div`
    height: 25%;
`;

export default {
    title: 'To-Do Scheduler/TodoTabs',
    component: TodoTabs
};

export const FullContainer = () => ( 
    <TodoTabs tabHeaders={tabHeaders} />
);

const tabProps = {
    title: 'Testing',
    val: 'Smaller testing'
};

export const RegularTab = () => (
    <TabWrapper>
        <Tab {...tabProps} />
    </TabWrapper>
);

export const ActiveTab = () => (
    <TabWrapper>
        <Tab active={true} {...tabProps} />
    </TabWrapper>
);