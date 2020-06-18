import _ from 'lodash';

const NO_MORE_TOKENS = "There are no tokens left";

export const Tokenizer = () => {
    let _program = '';
    let _literals = [];
    let _tokens = [];
    let _currentToken = 0;
    let _tokenizer = null;
    return {
        createTokenizer: (dslContent, literals) => {
            if (_tokenizer === null) {
                _program = dslContent;
                _literals = literals;
                _tokenizer = "created";
            }
        },
        getCurrentTokenIndex: () => _currentToken,
        getProgram: () => _program,
        getTokens: () => _tokens,
        hasTokensLeft: () => _currentToken < _tokens.length,
        nextToken: () => {
            let token = null;
            if (_currentToken < _tokens.length) {
                token = _tokens[_currentToken];
                _currentToken += 1;
            } else return NO_MORE_TOKENS;
            return token;
        },
        tokenize: () => {
            _program = _program.replace(/(\r\n)+/g, ' ').replace(/"/g, '');
            _.each(_literals, (val) => _program = _program.replace(new RegExp(val, 'g'), `!!!${val}!!!`));
            _tokens = _program.split(/!!!|,/);
            _tokens = _.filter(_tokens, (val) => val != '' && val != ' ');
            _tokens = _.map(_tokens, (val) => val.trim());
        }
    }
};