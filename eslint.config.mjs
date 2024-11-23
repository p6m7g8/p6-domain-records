import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.deps/',
    '.github/',
    '.mergify.yml',
    '.vscode/',
    'README.md',
    'cdk.json',
    'conf/*.yml',
    'package.json',
    'tsconfig.json',
  ],
  plugins: {
  },
  languageOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-new': 'off',
  },
  settings: {
  },
})
