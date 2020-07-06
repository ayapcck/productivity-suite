import React from 'react';

import { AddSheet } from './addSheet';
import { LanguageBlock } from './contentExplanation';

export const UseOptions = () => <LanguageBlock 
    content={<UseOptionsContent />} title='UseOptions' />;

const UseOptionsContent = () => <React.Fragment>
    <p>UseOptions: One or more of the following</p>
    <AddSheet />
</React.Fragment>;
