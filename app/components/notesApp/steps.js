import React from 'react';

import { AddNote } from './steps/addNote';
import { ChooseNote } from './steps/chooseNote';
import { ListType } from './steps/listType';
import { NoteType } from './steps/noteType';

export const NoteSteps = {
    uninitialized: {
        getContent: ({ changeStep }) => <AddNote changeStep={changeStep} />,
        title: 'uninitialized'
    },
    chooseType: {
        getContent: ({ changeStep }) => <ChooseNote changeStep={changeStep} />,
        title: 'chooseType'
    },
    note: {
        getContent: (props) => <NoteType {...props} />,
        title: 'note'
    },
    list: {
        getContent: props => <ListType {...props} />,
        title: 'list'
    }
};