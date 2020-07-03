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
    const visitMonthlyBudget = {
        visit: (monthlyBudget) => {
            monthlyBudget.date.accept(visitDate);
            monthlyBudget.expenses.accept(visitExpenses);
            console.log(`eval monthly budget ${monthlyBudget}`);
        }
    };
    const visitProgram = {
        visit: (program) => {
            _.each(program.sheetList, (sheet) => {
                sheet.accept(visitSheet);
                const month = sheet.content.date.month;
                const year = sheet.content.date.year;
                const expenses = sheet.content.expenses.expenseList;
                const props = {
                    expenses,
                    month, 
                    year,
                    spreadsheetId: program.id, 
                    startCol: 0
                }
                createMonthlyExpenseSheet(props);                
            });
        }
    };
    const visitSheet = { 
        visit: (sheet) => {
            switch (sheet.type) {
                case 'monthlyBudget':
                    sheet.content.accept(visitMonthlyBudget);
                    break;
                default:
                    break;
            }
            console.log(`eval sheet ${sheet}`);
        }
    };
    return { visitProgram };
};