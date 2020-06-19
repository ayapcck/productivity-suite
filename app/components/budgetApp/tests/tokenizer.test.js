import { Tokenizer } from '../DSL/tokenizer';

import { dslLiterals } from '../DSL/dslLiterals';

describe('Tokenizer', () => {
    const tokenizer = Tokenizer();
    const tokenizerInput = 'use spreadsheet XXXXX\r\n\r\nadd monthly_budget\r\ndate June 2020\r\nexpenses [ "eating out", "something", "else" ]\r\nadd\r\n\r\nuse';

    it('creates single instance of tokenizer', () => {
        tokenizer.createTokenizer(tokenizerInput, dslLiterals);
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
            'expenses', '\\[', 'eating out', 'something', 'else', '\\]', 
            'add', 'use'];
        expect(tokenizer.getTokens()).toEqual(expectedTokens);
    });
    it('has tokens after tokenization', () => {
        expect(tokenizer.hasTokensLeft()).toBeTruthy;
    });
    it('nextToken returns correct current token', () => {
        expect(tokenizer.nextToken()).toBe('use');
    });
    it('nextToken increments currentToken count properly', () => {
        expect(tokenizer.getCurrentTokenIndex()).toBe(1);
        tokenizer.nextToken();
        expect(tokenizer.getCurrentTokenIndex()).toBe(2);
    });
    it('viewCurrentToken returns correct current token', () => {
        expect(tokenizer.viewCurrentToken()).toBe('XXXXX');
    });
    it('viewCurrentToken does not increment currentToken count', () => {
        expect(tokenizer.getCurrentTokenIndex()).toBe(2);
        tokenizer.viewCurrentToken();
        expect(tokenizer.getCurrentTokenIndex()).toBe(2);
    });
    it('checkCurrentToken correctly matches next token', () => {
        tokenizer.nextToken();
        expect(tokenizer.checkCurrentToken(/add/)).toBeTruthy();
    });
    it('checkCurrentToken correctly distinguishes an incorrect match', () => {
        expect(tokenizer.checkCurrentToken(/add/)).toBeTruthy();
        expect(tokenizer.checkCurrentToken(/daad/)).toBeFalsy();
    });
    it('checkCurrentToken does not increment currentToken count', () => {
        expect(tokenizer.getCurrentTokenIndex()).toBe(3);
    });
    it('getAndcheckCurrentToken correctly matches next token', () => {
        const nextToken = tokenizer.getAndCheckCurrentToken(/add/);
        expect(nextToken).toBe('add');
    });
    it('getAndCheckCurrentToken correctly increments currentToken count',() => {
        expect(tokenizer.getCurrentTokenIndex()).toBe(4);
    });
    it('getAndCheckCurrentToken throws error on incorrect match', () => {
        const token = tokenizer.viewCurrentToken();
        const regexp = /dont_match/;
        expect(() => tokenizer.getAndCheckCurrentToken(regexp)).toThrow(`Failed matching ${token} to ${regexp}`);
    });
});

