import { Date } from './AST/date';
import { Expenses } from './AST/expenses';
import { MonthlyBudget } from './AST/monthlyBudget';
import { ProgramNode } from './AST/program';
import { Sheet } from './AST/sheet';
import { Tracking } from './AST/tracking';

export const Parser = (tokenizer) => {
    let _id = null;
    const _date = () => {
        const monthYear = tokenizer.nextToken();
        const month = monthYear.split(' ')[0];
        const year = monthYear.split(' ')[1];
        return Date(month, year);
    };
    const _expenses = () => {
        tokenizer.getAndCheckCurrentToken(/\[/);
        let expenseList = [];

        while (tokenizer.hasTokensLeft() && !tokenizer.checkCurrentToken(/\]/)) {
            expenseList.push(tokenizer.nextToken());
        }
        
        tokenizer.getAndCheckCurrentToken(/\]/);
        
        return Expenses(expenseList);
    };
    const _monthly_budget = () => {
        let date;
        let expenses;
        let tracking;
        while (tokenizer.hasTokensLeft() && !tokenizer.checkCurrentToken(/add/)) {
            switch (tokenizer.nextToken()) {
                case 'date':
                    date = _date();
                    break;
                case 'expenses':
                    expenses = _expenses();
                    break;
                case 'track':
                    tracking = _tracking();
                    break;
                default:
                    break;
            }
        }
        return Sheet('monthlyBudget', MonthlyBudget(date, expenses, tracking));
    };
    const _program = () => {
        let _sheetList = [];
        tokenizer.getAndCheckCurrentToken(/use/);
        tokenizer.getAndCheckCurrentToken(/spreadsheet/);
        _id = tokenizer.nextToken();

        /* This should be where all sheets are generated */
        while (tokenizer.hasTokensLeft() && !tokenizer.checkCurrentToken(/use/)) {
            const newSheet = _sheet();
            _sheetList.push(newSheet);
        }  

        tokenizer.getAndCheckCurrentToken(/use/);
        return ProgramNode(_id, _sheetList);
    };
    const _sheet = () => {
        tokenizer.getAndCheckCurrentToken(/add/);
        let sheet = null;
        switch (tokenizer.nextToken()) {
            case 'monthly_budget':
                sheet = _monthly_budget();
                break;
            default:
                alert('sheet type unknown');
                break;
        }
        tokenizer.getAndCheckCurrentToken(/add/);
        return sheet;
    }
    const _tracking = () => {
        tokenizer.getAndCheckCurrentToken(/\[/);
            let trackingList = [];
    
            while (tokenizer.hasTokensLeft() && !tokenizer.checkCurrentToken(/\]/)) {
                trackingList.push(tokenizer.nextToken());
            }
            
            tokenizer.getAndCheckCurrentToken(/\]/);

            return Tracking(trackingList);
    }
    return {
        parse: () => _program()
    };
};