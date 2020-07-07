import React from 'react';
import { LanguageBlock } from './contentExplanation';

export const UseBlock = () => {
    return <LanguageBlock content={<UseContent />} title='Use' />;
}

const UseContent = () => <React.Fragment>
    <p>Format:</p>
    <p>use spreadsheet XXXXX</p>
    <p>{`<UseOptions>`}</p>
    <p>use</p>
</React.Fragment>;