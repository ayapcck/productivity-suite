const DNE = 'does not equal';

const Response = (status, reason = '') => {
    return {status, reason};
};

export default class Matchers {
    constructor(data) {
        this.value = data;
        
        /* COSMETIC PROPERTIES */
        this.to = this;
        this.have = this;
        this.be = this;

        this.negation = false;
    }

    returnMessage(exp) {
        return this.negation
            ? `${this.value} equals ${exp} when it shouldn't`
            : `${this.value} does not equal ${exp}`;
    }

    simpleStatus(value) {
        return this.negation ? this.value !== value : this.value === value;
    }
    
    /* ASSERTION PROPERTIES */

    get false() {
        return Response(this.simpleStatus(false), this.returnMessage('false'));
    }
    get true() {
        return Response(this.simpleStatus(true), this.returnMessage('true'));
    } 
    get undefined() {
        return Response(this.simpleStatus(undefined), this.returnMessage('undefined'));
    }
    get null() {
        return Response(this.simpleStatus(null), this.returnMessage('null'));
    }

    /* FLAGGING PROPERTIES */
    get not() {
        this.negation = true;
        return this;
    }

    /* METHODS */
    eql(exp) {
        return Response(this.simpleStatus(exp), `${exp} ${DNE} ${this.value}`);
    }

    equal(exp) {
        const status = this.negation ? !this.value.equals(exp) : this.value.equals(exp);
        return Response(status, `${exp} ${DNE} ${this.value}`);
    }

    lengthOf(length) {
        const status = this.negation ? this.value.length !== length : this.value.length === length;
        return Response(status, `${length} ${DNE} ${this.value.length}`);
    }

    throw(ErrorType) {
        try {
            this.value()
        } catch (e) {
            if (typeof e === typeof ErrorType) {
                return Response(true);
            }
        }
        return Response(false, `${ErrorType} was not thrown`);
    }
}