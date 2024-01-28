module.exports = {
    root: true,
    extends: ['universe/native', 'universe/shared/typescript-analysis'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    rules: {
        'prettier/prettier': ['error', { semi: false }],
    },
}
