import _ from 'lodash';

const NO_MORE_TOKENS = "There are no tokens left";

export const Tokenizer = () => {
    let _program = '';
    let _literals = [];
    let _tokens = [];
    let _currentToken = 0;
    let _tokenizer = null;
    const _hasTokensLeft = () => _currentToken < _tokens.length;
    /* returns current token then increments currentToken */
    const _nextToken = () => {
        let token = null;
        if (_hasTokensLeft()) {
            token = _tokens[_currentToken];
            _currentToken += 1;
        } else return NO_MORE_TOKENS;
        return token;
    }
    /* returns current token */
    const _viewCurrentToken = () => _hasTokensLeft() ? _tokens[_currentToken] : NO_MORE_TOKENS;
    return {
        checkCurrentToken: (regexp) => regexp.test(_viewCurrentToken()),
        createTokenizer: (dslContent, literals) => {
            if (_tokenizer === null) {
                _program = dslContent;
                _literals = literals;
                _tokenizer = "created";
            }
        },
        getAndcheckCurrentToken: (regexp) => {
            let token = _nextToken();
            if (!regexp.test(token)) {
                throw new Error('Did not correctly match token');
            }
            return token;
        },
        getCurrentTokenIndex: () => _currentToken,
        getProgram: () => _program,
        getTokens: () => _tokens,
        hasTokensLeft: () => _hasTokensLeft(),
        nextToken: () => _nextToken(),
        tokenize: () => {
            _program = _program.replace(/(\r\n)+/g, ' ').replace(/"/g, '');
            _.each(_literals, (val) => _program = _program.replace(new RegExp(val, 'g'), `!!!${val}!!!`));
            _tokens = _program.split(/!!!|,/);
            _tokens = _.filter(_tokens, (val) => val.trim() != '' && val.trim() != ' ');
            _tokens = _.map(_tokens, (val) => val.trim());
        },
        viewCurrentToken: () => _viewCurrentToken()
    }
};