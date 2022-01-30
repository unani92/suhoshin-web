module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:vue/essential',
        'standard',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        indent: ['error', 4, { "SwitchCase": 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': ['error', 'never'],
        'prefer-promise-reject-errors': 'off',
        'no-unneeded-ternary': 'off',
        camelcase: ['error', {
            ignoreDestructuring: true,
            properties: 'never',
        }],
        "no-new": 0,
    },
}
