module.exports = {
    root: true,
    settings: {
        react: {
            version: 'detect',
            componentWrapperFunctions: ['conditionalWrapper'],
            linkComponents: [
                {
                    name: 'Link',
                    linkAttribute: 'to',
                },
            ],
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                project: [
                    'tsconfig.json',
                    'tsconfig.config.json',
                    'build-utils/tsconfig.json',
                    'docs/tsconfig.json',
                ],
            },
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
            './tsconfig.json',
            './tsconfig.config.json',
            './build-utils/tsconfig.json',
            './docs/tsconfig.json',
        ],
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:storybook/recommended',
        'plugin:import/recommended',
    ],
    rules: {
        'jsx-a11y/no-autofocus': 'off',
        // no-cycle is sadly to slow...
        // "import/no-cycle": ["error", { ignoreExternal: true }],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:import/typescript',
            ],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    { argsIgnorePattern: '^_', varsIgnorePattern: '^_T' },
                ],
                'react/prop-types': 'off',
            },
        },
    ],
    env: {
        es6: true,
        browser: true,
    },
};
