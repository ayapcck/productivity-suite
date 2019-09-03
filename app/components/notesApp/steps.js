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
        getContent: ({ content, editing, updateNote }) => <NoteType content={content} editing={editing} updateNote={updateNote} />,
        title: 'note'
    },
    list: {
        getContent: ({ content, editing, updateNote }) => <ListType content={content} editing={editing} updateNote={updateNote} />,
        title: 'list'
    }
};