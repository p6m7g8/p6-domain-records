import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.github/pull_request_template.md',
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
