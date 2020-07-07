import React from 'react';

import { LanguageBlock } from './contentExplanation';
import { MonthlyExpenses } from './monthlyExpenses';

export const AddSheet = () => <LanguageBlock 
    content={<AddSheetContent />} title='AddSheet' />;

const AddSheetContent = () => <React.Fragment>
    <p>Adds one of the following types of sheets</p>
    <MonthlyExpenses />
    <p>Format:</p>
    <p>{`add <SheetType>`}</p>
    <p>{`<SheetProperties>`}</p>
    <p>add</p>
</React.Fragment>;