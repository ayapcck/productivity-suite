import _ from 'lodash';

export const EvaluateVisitor = () => {
    const visitDate = {
        visit: (date) => {
            alert(`${date.month} ${date.year}`);
        }
    };
    const visitExpenses = {
        visit: (expenses) => {
            alert(`${expenses.expenseList}`);
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
            _.each(program.sheetList, (val) => val.accept(visitSheet));
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