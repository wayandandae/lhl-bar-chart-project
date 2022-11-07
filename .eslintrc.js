module.exports = {
    'extends': 'lighthouselabs',
/* had to add these to utilize new syntaxes,
such as 'let' or 'const', rather than the archaic 'var' */
    'parserOptions': {
      'sourceType': 'module',
      'ecmaVersion': 2017
    },

    'env': {
      'es6': true
    }
};
