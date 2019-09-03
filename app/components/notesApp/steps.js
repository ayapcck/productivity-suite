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
        getContent: ({ content, updateNote }) => <NoteType content={content} updateNote={updateNote} />,
        title: 'note'
    },
    list: {
        getContent: ({ content, updateNote }) => <ListType content={content} updateNote={updateNote} />,
        title: 'list'
    }
};