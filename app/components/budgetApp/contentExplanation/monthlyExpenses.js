import React from 'react';

import { LanguageBlock } from './contentExplanation';

const monthlyExpenseItems = {
    date: {
        getContent: () => <DateContent />,
        required: true,
        title: 'Date'
    }, 
    expenses: {
        getContent: () => <ExpensesContent />,
        required: true,
        title: 'Expenses'
    },
    track: {
        getContent: () => <TrackingContent />,
        required: false,
        title: 'Track'
    }
};

const DateContent = () => <React.Fragment>
    <p>The month becomes the name of the new sheet</p>
    <p>Format:</p>
    <p>{`date <month> <year>`}</p>
</React.Fragment>;
const ExpensesContent = () => <React.Fragment>
    <p>These become the column headers for various expenditures</p>
    <p>Format:</p>
    <p>{`expenses [ "<item1>", "<item2>", "<item3>", ... ]`}</p>
</React.Fragment>;
const TrackingContent = () => <React.Fragment>
    <p>These become aggregation counts for select expenses from the above list</p>
    <p>Format:</p>
    <p>{`track [ "<item1>", "<item3>" ]`}</p>
</React.Fragment>;

export const MonthlyExpenses = () => <LanguageBlock title='Monthly Expenses'
    content={<MonthlyExpensesContent />}/>;

const MonthlyExpensesContent = () => <React.Fragment>
    <p>SheetType: monthlyExpenses</p>
    <p>SheetProperties:</p>
    <MonthlyExpenseProperties />
</React.Fragment>;

const MonthlyExpenseProperties = () => {
    return _.map(monthlyExpenseItems, (item) => {
        const title = item.required ? `${item.title} - required` : item.title;

        return <LanguageBlock key={`${item.title}_langElt`} 
            content={item.getContent()} title={title} />
    });
};
