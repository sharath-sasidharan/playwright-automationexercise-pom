<h1># Playwright POM End-to-End Suite for AutomationExercise</h1>

An end-to-end test automation framework for https://automationexercise.com built with Playwright and the Page Object Model (POM). The suite validates critical e-commerce user journeys and provides rich Allure reports (screenshots, videos, traces) for fast debugging and CI integration.

---

## Quick summary

- Scope: 26 end-to-end tests covering registration, authentication, product discovery, cart management, checkout flows, contact form and subscription flows, file-upload, and UI behaviors (scrolling).
- Pattern: Page Object Model with a central `POManager` factory (`page-objects/po-manager.js`).
- Reporting: Allure (screenshots, videos, traces) via `allure-playwright` and `allure-commandline`.
- Tech: Playwright (1.55.1), @playwright/test, Node.js 16+, JavaScript (ES6+).

---

## Why this project (short)

- Provides reliable, maintainable E2E regression coverage for an e-commerce site.
- Separates test logic from UI details using POM, reducing maintenance overhead when the UI changes.
- Generates actionable Allure reports to speed triage of failures.

---

## What's included

- `tests/` — 26 spec files (business scenarios).
- `page-objects/` — 9 page objects and `po-manager.js`.
- `test-data/` — JSON fixtures and sample upload file.
- `playwright.config.js` — centralized test configuration (projects, retries, trace/screenshot/video settings).
- `package.json` — scripts for running tests, cleaning results, and Allure commands.
- `allure-results/` & `allure-report/` — generated artifacts (gitignored).

---

## Target bullets (copy-paste friendly)

- Playwright POM End-to-End Suite for AutomationExercise — 26 E2E tests validating registration, login, search, cart, and checkout flows.
- Built a central PO Manager and 9 page objects to isolate selectors and actions, reducing UI-change fixes to a single location.
- Integrated Allure reporting with screenshots, videos and traces; added npm scripts to generate and serve reports.
- Configurable via `playwright.config.js` and `package.json` (retries, timeouts, headless, baseURL).
- Supports dynamic test data generation and deterministic test flows for CI pipelines.

---

## Quick start (local)

Prerequisites: Node.js v16+, npm

1. Install dependencies:

```powershell
npm install
npx playwright install
```

2. Run full test suite:

```powershell
npm run test
```

3. Run single test:

```powershell
npx playwright test tests/register.spec.js
```

4. Run and generate Allure report (clean → run → generate → open):

```powershell
npm run test:allure
```

Notes: On Windows PowerShell use the commands above as-is. Environment variables can be set before running (e.g. `$env:HEADLESS='true'`).

---

## Configuration & environment variables

The project exposes runtime configuration via `playwright.config.js` and `package.json` `config` section. Common variables:

- `BASE_URL` or `process.env.BASE_URL` — override base URL (default: https://automationexercise.com)
- `HEADLESS` — set to `true` to run headless
- `MAXIMIZE` — set to `true` to launch the browser maximized
- `ACTION_TIMEOUT`, `NAVIGATION_TIMEOUT`, `TEST_TIMEOUT` — timeouts in ms

Example (PowerShell):

```powershell
$env:BASE_URL='https://automationexercise.com'; $env:HEADLESS='true'; npm run test
```

---

## Test design & patterns

- Page Object Model: Page objects contain selectors and action methods. Tests orchestrate business flows using PO methods.
- PO Manager: single factory to create and share page objects in tests.
- Data-driven: Test data lives in `test-data/` and tests generate unique emails to avoid collisions.
- Reporting: trace retention on failure, screenshots and videos are collected for every test run per `playwright.config.js`.

---

## Running in CI

- The repository is CI-ready. Typical CI steps:
  1.  Install Node and dependencies.
  2.  npx playwright install --with-deps (or `npx playwright install` depending on runner).
  3.  Run `npm run test:clean` or `npm run test`.
  4.  Use `allure` to generate and publish the `allure-report` artifacts.

Tip: set `CI=true` in the environment to enable CI configuration (retries/workers) defined in `playwright.config.js`.

---

## Example troubleshooting commands

```powershell
# Show Playwright HTML report
npx playwright show-report

# Show generated Allure HTML
npx allure open allure-report

# Regenerate Allure report (manual)
npm run allure:generate && npm run allure:open
```

---

## Recommended README bullets for GitHub project header

- Playwright POM E2E suite — 26 tests for e-commerce flows (registration → checkout).
- Allure reporting with screenshots & videos for every test run.
- CI-ready: configurable retries, traces-on-failure, and single-point PO Manager.
- Run locally with `npm install` → `npx playwright install` → `npm run test`.

---

## Contribution & notes

- Keep page object methods UI-focused and tests business-focused.
- When adding a test, add required test-data to `test-data/` and keep the test independent (clean up created accounts).
- If a selector changes, update the relevant page object; tests should not be modified for selector changes.

If you'd like, I can:

- add a small GIF or screenshot into the README showing the Allure dashboard (placeholder image included), or
- create a `README-SUMMARY.md` snippet you can paste into your GitHub project description.

---

## License & authors

This repository is provided as-is. Update `package.json` `author` and `license` fields as needed.

### Important: Test Count Accuracy

The project has **26 test cases** (one per test file). If Allure shows more than 26 tests:

1. Old test results have accumulated
2. Run `npm run test:allure` to clean and regenerate
3. See [QUICK_START_ALLURE.md](./QUICK_START_ALLURE.md) for troubleshooting

## 🏛️ Architecture

### Page Object Model

The project follows the Page Object Model pattern for better maintainability:

- **`po-manager.js`** - Central manager for all page objects
- **`register.js`** - Handles registration, login, logout functionality
- **`contact-us.js`** - Contact form interactions
- **`products.js`** - Product listing and search functionality
- **`subscription.js`** - Newsletter subscription functionality
- **`cart.js`** - Shopping cart and checkout functionality
- **`checkout.js`** - Order placement and payment functionality
- **`test-cases.js`** - Test cases page functionality

### Test Organization

- Each test case has its own spec file
- Tests are organized by functionality
- Shared functionality is abstracted into page objects
- DRY principle is followed throughout

## 🔧 Configuration

### Playwright Configuration

- **Browser**: Chromium (configurable)
- **Parallel execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Timeout**: 30 seconds default
- **Headless**: false (visible browser)

### Allure Configuration

- **Output folder**: `allure-results/`
- **Report folder**: `allure-report/`
- **Screenshots**: Enabled for all tests (`screenshot: 'on'`)
- **Videos**: Enabled for all tests (`video: 'on'`)
- **Traces**: Enabled for failures (`trace: 'retain-on-failure'`)
- **Auto-clean**: Enabled via npm scripts
- **Detailed reporting**: Full test execution details with environment info

## 📝 Test Data

### Dynamic Data Generation

- Email addresses are generated with timestamps
- User data is created dynamically for each test
- File uploads use test data from `test-data/` folder

### Test Data Files

- `test-data/upload_file.txt` - Sample file for upload testing

## 🎯 Key Features

### 1. User Management

- User registration with complete profile
- Login with valid/invalid credentials
- User logout functionality
- Account deletion after testing

### 2. Product Management

- Product listing verification
- Product detail page validation
- Product search functionality
- Search results verification

### 3. Contact Form

- Form submission with all fields
- File upload functionality
- Success message verification
- Form validation testing

### 4. Subscription

- Newsletter subscription from home page
- Newsletter subscription from cart page
- Success message verification
- Email validation

### 5. Shopping Cart

- Add multiple products to cart
- Verify cart contents and quantities
- Update product quantities
- Cart total calculations
- Remove products from cart
- Cart management and cleanup

### 6. Order Placement

- Complete checkout workflow
- Registration during checkout
- Registration before checkout
- Login before checkout
- Payment processing
- Order confirmation
- Address verification
- Account cleanup after orders

### 7. Category & Brand Navigation

- Category-based product filtering
- Brand-based product filtering
- Sidebar navigation functionality
- Product categorization verification

### 8. Enhanced Product Search

- Product search functionality
- Search result verification
- Cart persistence after login
- Cross-session cart management

### 9. Navigation

- Test cases page navigation
- URL verification
- Page content validation

## ⚙️ Configuration & Test Data Management

### Centralized Configuration

- **Base URL**: Stored in `package.json` config section
- **Timeouts**: Configurable timeouts for different operations
- **Test Data**: Centralized JSON files for all test data

### Test Data Structure

- **`test-data/user-data.json`**: User accounts, profiles, and payment data
- **`test-data/product-data.json`**: Product search terms, categories, and brands
- **`test-data/contact-data.json`**: Contact form data and subscription information

### Configuration Loading

- **`utils/config-loader.js`**: Utility module for loading configuration and test data
- **Dynamic Data Generation**: Functions for generating unique emails and names
- **DRY Principle**: No hardcoded values in tests or page objects

## 🐛 Error Handling

- Robust error handling in page objects
- Fallback selectors for dynamic elements
- Timeout management for slow operations
- Graceful failure handling

## 📈 Best Practices Implemented

1. **Page Object Model** - Maintainable and reusable code
2. **DRY Principle** - No code duplication
3. **Separation of Concerns** - Each page object handles specific functionality
4. **Dynamic Data** - Tests don't depend on static data
5. **Comprehensive Reporting** - Both Playwright and Allure reports
6. **Error Handling** - Robust error handling throughout
7. **Clean Architecture** - Well-organized project structure

## 🔍 Debugging

### View test execution

```bash
npx playwright test --headed
```

### Debug specific test

```bash
npx playwright test tests/register.spec.js --debug
```

### Trace viewer

```bash
npx playwright show-trace test-results/trace.zip
```

## 📚 Additional Commands

```bash
# Run tests with specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4

# Run tests with specific timeout
npx playwright test --timeout=60000

# Generate test report
npx playwright show-report

# Clean test results
npx playwright test --reporter=html --reporter=allure-playwright
```
