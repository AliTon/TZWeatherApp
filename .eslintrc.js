module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['react-app', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        '@typescript-eslint/ban-ts-comment': "off",
        '@typescript-eslint/no-non-null-assertion': "off"
    },
}
