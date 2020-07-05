import { dslLiterals } from '../DSL/dslLiterals';
import { Parser } from '../DSL/parser';
import { Tokenizer } from '../DSL/tokenizer';

describe('Parser', () => {
    it('should correctly parse a simple tree', () => {
        const tokenizer = Tokenizer() ;
        const tokenizerInput = 'use spreadsheet XXXXX\r\n\r\nadd monthlyExpenses\r\ndate June 2020\r\nexpenses [ "eating out", "something", "else" ]\r\nadd\r\n\r\nuse';
        tokenizer.createTokenizer(tokenizerInput, dslLiterals);
        tokenizer.tokenize();
        const AST = Parser(tokenizer).parse();
        expect(AST).toBeDefined();
        /* ProgramNode correct */
        expect(AST.id).toBe('XXXXX');
        expect(AST.sheetList.length).toBe(1);
        /* MonthlyExpenses node correct */
        const sheet = AST.sheetList[0];
        expect(sheet.type).toBe('monthlyExpenses');
        expect(sheet.content).toBeDefined();
        const monthlyExpenses = sheet.content;
        expect(monthlyExpenses.date).toBeDefined();
        expect(monthlyExpenses.expenses).toBeDefined();
        /* Date node correct */
        const date = monthlyExpenses.date;
        expect(date.month).toBe('June');
        expect(date.year).toBe('2020');
        /* Expenses node correct */
        const expenses = monthlyExpenses.expenses
        expect(expenses.expenseList.length).toBe(3)
        expect(expenses.expenseList[0]).toBe('eating out');
        expect(expenses.expenseList[1]).toBe('something');
        expect(expenses.expenseList[2]).toBe('else');
    });
});