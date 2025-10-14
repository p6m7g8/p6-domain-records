# Copilot Coding Agent Onboarding

## 🔍 What This Repo Does
- AWS CDK + TypeScript project
- Reads a YAML file to create Route 53 domains
- Repository name: **p6-domain-records**

## 🛠️ Technologies & Structure
- Runtime: Node.js >= 24.9.0 (pnpm)
- Languages: TypeScript, YAML
- Frameworks: AWS CDK v2, Jest, ESLint
- Package manager: pnpm
- Key files:
  - `package.json` / `pnpm-lock.yaml`
  - `tsconfig.json`, `cdk.json`
  - `src/` (CDK app code)
  - `test/` (Jest tests)
  - `.github/workflows/` (CI pipelines)
  - `eslint.config.mjs`

## 🚀 Build & Validation (always follow in order)
1. **Install dependencies**  
   Always run `pnpm install` (Node >= 24.9).
2. **Lint**  
   `pnpm run lint`  
   Fix issues: `pnpm run lint:fix`
3. **Build & Synth**  
   `pnpm run build`  
   → runs lint, tests, and `cdk synth`
4. **Test**  
   `pnpm run test` (Jest coverage)
5. **CDK commands**  
   - Synthesize: `pnpm run cdk synth`  
   - Diff: `pnpm run cdk diff`  
   - Deploy: `pnpm run cdk deploy`
6. **Clean & Retry**  
   If failures occur, remove `node_modules/`, `cdk.out/`, `dist/`, then reinstall.

## 🗂️ Project Layout & Key Paths
- Root
  - `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `cdk.json`
  - `.github/workflows/`  
    - `build.yml`, `deploy.yml`, `pull-request-lint.yml`, `auto-approve.yml`, `upgrade-main.yml`
  - `eslint.config.mjs`: custom ESLint setup
- `src/`: TypeScript source (entry in `src/index.ts`)
- `test/`: Jest unit tests
- `conf/`: YAML domain definitions

## ✅ CI Checks & Workflows
- **Pull Request**  
  - Lint PR title (`pull-request-lint.yml`)
  - Build & test (`build.yml`)
- **Main branch**  
  - Deploy on push (`deploy.yml`)
  - Daily dependency upgrade (`upgrade-main.yml`)

You can replicate any workflow locally by running the corresponding npm script above.

## 🤖 Usage Guidance
- Trust this sheet first—avoid repetitive `grep` or `find` unless content is outdated.
- Navigate to `src/` for code changes; place tests in `test/`.
- Use existing scripts; do not invent new commands.
- Confirm your changes by running the full build cycle before submitting.

