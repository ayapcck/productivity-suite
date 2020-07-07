import { getDays } from '../dates';

describe('getDays', () => {
    it('gets correct number of days for January', () => {
        expect(getDays('January')).toBe(31);
    });
    it('gets correct number of days for February on leapyear', () => {
        expect(getDays('February', 2020)).toBe(29);
    });
    it('gets correct number of days for February on non-leapyear', () => {
        expect(getDays('February', 2019)).toBe(28);
    })
    it('gets correct number of days for March', () => {
        expect(getDays('March')).toBe(31);
    });
    it('gets correct number of days for April', () => {
        expect(getDays('April')).toBe(30);
    });
    it('gets correct number of days for May', () => {
        expect(getDays('May')).toBe(31);
    });
    it('gets correct number of days for June', () => {
        expect(getDays('June')).toBe(30);
    });
    it('gets correct number of days for July', () => {
        expect(getDays('July')).toBe(31);
    });
    it('gets correct number of days for August', () => {
        expect(getDays('August')).toBe(31);
    });
    it('gets correct number of days for September', () => {
        expect(getDays('September')).toBe(30);
    });
    it('gets correct number of days for October', () => {
        expect(getDays('January')).toBe(31);
    });
    it('gets correct number of days for November', () => {
        expect(getDays('November')).toBe(30);
    });
    it('gets correct number of days for December', () => {
        expect(getDays('December')).toBe(31);
    });
});