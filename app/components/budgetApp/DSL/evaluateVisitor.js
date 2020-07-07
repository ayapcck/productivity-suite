import _ from 'lodash';

import { createMonthlyExpenseSheet } from '../sheetsAPI/monthlyExpenses';
import { months, getDays } from '../../utilities/dates';

export const EvaluateVisitor = () => {
    const visitDate = {
        visit: (date) => {
            // alert(`${date.month} ${date.year}`);
        }
    };
    const visitExpenses = {
        visit: (expenses) => {
            // alert(`${expenses.expenseList}`);
        }
    };
    const visitMonthlyExpenses = {
        visit: (monthlyExpenses) => {
            monthlyExpenses.date.accept(visitDate);
            monthlyExpenses.expenses.accept(visitExpenses);
            monthlyExpenses.tracking.accept(visitTracking);
        }
    };
    const visitProgram = {
        visit: (program) => {
            _.each(program.sheetList, (sheet) => {
                sheet.accept(visitSheet);
                const month = sheet.content.date.month;
                const year = sheet.content.date.year;
                const expenses = sheet.content.expenses.expenseList;
                const trackingList = sheet.content.tracking.trackingList;
                const props = {
                    expenses,
                    month, 
                    spreadsheetId: program.id,
                    trackingList,
                    year
                }
                createMonthlyExpenseSheet(props);                
            });
        }
    };
    const visitSheet = { 
        visit: (sheet) => {
            switch (sheet.type) {
                case 'monthlyExpenses':
                    sheet.content.accept(visitMonthlyExpenses);
                    break;
                default:
                    break;
            }
        }
    };
    const visitTracking = {
        visit: (tracking) => {

        }
    };
    return { visitProgram };
};