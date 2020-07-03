import _ from 'lodash';

import { addExpensesRow, createNewSheet } from '../sheetsAPI/helpers';
import { months, months30, months31 } from '../../utilities/dates';

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
            _.each(program.sheetList, async (sheet) => {
                sheet.accept(visitSheet);
                const title = sheet.content.date.month;
                const year = sheet.content.date.year;
                const expenses = sheet.content.expenses.expenseList;
                let sheetId = '';
                try {
                    sheetId = await createNewSheet(program.id, title);
                    let expenseRow = ['Expenses: >  Date: V'];
                    _.each(expenses, (expense) => expenseRow.push(expense));
                    let values = [expenseRow];
                    let days = months31.includes(title) ? 31 : 30;
                    days = title === 'February' ? 29 : days;
                    for (let day = 1; day < days + 1; day++) {
                        values.push([`${months.indexOf(title)+1}/${day}/${year}`]);
                    }
                    const expenseRowProps = {
                        sheetId,
                        sheetTitle: title, 
                        spreadsheetId: program.id, 
                        startCol: 0,
                        values
                    }
                    let response = await addExpensesRow(expenseRowProps);
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
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