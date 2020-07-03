import { getColumnChar } from '../sheetsAPI/helpers';

describe('getColumnChar', () => {
    it('returns A with 1 as input', () => {
        expect(getColumnChar(1)).toBe('A');
    });
    it('returns B with 2 as input', () => {
        expect(getColumnChar(2)).toBe('B');
    });
    it('returns C with an input of length of 3-element array', () => {
        expect(getColumnChar(['one', 'two', 'three'].length)).toBe('C');
    })
});