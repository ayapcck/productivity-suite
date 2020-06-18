import { Tokenizer } from '../DSL/tokenizer';

const tokenizer = Tokenizer();

const tokenizerInput = 'use spreadsheet XXXXX\r\n\r\nadd monthly_budget\r\ndate June 2020\r\nexpenses [ "eating out", "something" ]\r\nadd\r\n\r\nuse';
const literals = ['use', 'spreadsheet', 'add', 'monthly_budget', 'date', 'expenses', '\\[', '\\]'];

describe('Tokenizer', () => {
    it('creates single instance of tokenizer', () => {
        tokenizer.createTokenizer(tokenizerInput, literals);
        expect(tokenizer.getProgram()).toBe(tokenizerInput);
        tokenizer.createTokenizer('bad', ['bad1', 'bad2']);
        expect(tokenizer.getProgram()).toBe(tokenizerInput);
    });
    it('has no tokens before tokenization', () => {
        expect(tokenizer.hasTokensLeft()).toBeFalsy;
    });
    it('tokenizes simple input', () => {
        tokenizer.tokenize();
        const expectedTokens = ['use', 'spreadsheet', 'XXXXX', 
            'add', 'monthly_budget', 
            'date', 'June 2020', 
            'expenses', '\\[', 'eating out', 'something', '\\]', 
            'add', 'use'];
        expect(tokenizer.getTokens()).toEqual(expectedTokens);
    });
    it('has tokens after tokenization', () => {
        expect(tokenizer.hasTokensLeft()).toBeTruthy;
    });
    it('nextToken returns correct next token', () => {
        expect(tokenizer.nextToken()).toBe('use');
    });
    it('nextToken increments currentToken count properly', () => {
        expect(tokenizer.getCurrentTokenIndex()).toBe(1);
        tokenizer.nextToken();
        expect(tokenizer.getCurrentTokenIndex()).toBe(2);
    });
});

