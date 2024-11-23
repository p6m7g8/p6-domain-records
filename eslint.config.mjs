import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.deps/',
    '.github/',
    '.mergify.yml',
    '.vscode/',
    'cdk.json',
    'conf/*.yml',
    'package.json',
    'tsconfig.json',
  ],
  plugins: {
  },
  languageOptions: {
  },
  rules: {
    'no-new': 'off',
  },
  settings: {
  },
})
