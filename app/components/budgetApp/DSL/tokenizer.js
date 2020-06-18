export default class Tokenizer {
    
    _program;
    _literals = [];
    _tokens = [];
    _currentToken;
    _tokenizer = null;
    
    _constructor(dslContent, literalList) {
        this._literals = literalList;
        this._program = dslContent;
    }

    createTokenizer(dslContent, literals) {
        if (this._tokenizer === null) {
            this._tokenizer = new Tokenizer(dslContent, literals);
        }
    }

    getTokenizer() { return this._tokenizer; }

}