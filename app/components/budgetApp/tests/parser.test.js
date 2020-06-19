import { dslLiterals } from '../DSL/dslLiterals';
import { Parser } from '../DSL/parser';
import { Tokenizer } from '../DSL/tokenizer';

describe('Parser', () => {
    it('should correctly parse a simple tree', () => {
        const tokenizer = Tokenizer() ;
        const tokenizerInput = 'use spreadsheet XXXXX\r\n\r\nadd monthly_budget\r\ndate June 2020\r\nexpenses [ "eating out", "something", "else" ]\r\nadd\r\n\r\nuse';
        tokenizer.createTokenizer(tokenizerInput, dslLiterals);
        tokenizer.tokenize();
        const AST = Parser(tokenizer).parse();
        expect(AST).toBeDefined();
        /* ProgramNode correct */
        expect(AST.id).toBe('XXXXX');
        expect(AST.sheetList.length).toBe(1);
        /* MonthlyBudget node correct */
        const sheet = AST.sheetList[0];
        expect(sheet.type).toBe('monthlyBudget');
        expect(sheet.content).toBeDefined();
        const monthly_budget = sheet.content;
        expect(monthly_budget.date).toBeDefined();
        expect(monthly_budget.expenses).toBeDefined();
        /* Date node correct */
        const date = monthly_budget.date;
        expect(date.month).toBe('June');
        expect(date.year).toBe('2020');
        /* Expenses node correct */
        const expenses = monthly_budget.expenses
        expect(expenses.expenseList.length).toBe(3)
        expect(expenses.expenseList[0]).toBe('eating out');
        expect(expenses.expenseList[1]).toBe('something');
        expect(expenses.expenseList[2]).toBe('else');
    });
});