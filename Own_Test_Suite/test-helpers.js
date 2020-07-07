import Matchers from './matchers';

const GREEN = 'color: #32a852;';
const RED = 'color: #fc030b;';

const testResult = (passed, label = '') => {
    const status = passed ? '%cpass' : '%cfail';
    print(`    - ${label}: ${status}`, passed ? GREEN : RED);
} 

const print = (data, styling = null) => styling ? console.log(data, styling) : console.log(data);

export const describe = (description, fn) => {
    print(`${description}:`);
    fn();
};

export const it = (message, fn) => describe(`--> ${message}`, fn);

export const expect = (data) => new Matchers(data);

export const test = (label, expectation) => {
    const passed = expectation === true || (expectation.status && expectation.status === true);
    testResult(passed, label);
    console.assert(expectation.status, expectation.reason);
};

// const testThrowMethod = () => {
//     throw new Error;
// }

// class SomeError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'SomeError';
//     }
// }

// describe ('testing expect throw', () => {
//     test('testThrowMethod should throw Error', expect(testThrowMethod).to.throw(new SomeError));
// });