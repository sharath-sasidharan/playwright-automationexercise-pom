# 🚀 Allure Reports - Quick Start Guide

## One-Command Solution

```bash
npm run test:allure
```
✅ **This does everything:** Cleans → Tests → Report → Opens browser

---

## Common Commands

| Command | What It Does |
|---------|-------------|
| `npm run test:allure` | **RECOMMENDED** - Clean, test, generate, open report |
| `npm run test:clean` | Clean old results + run tests |
| `npm run allure:clean` | Remove old results and reports |
| `npm run allure:open` | Open existing report |
| `npm run allure:serve` | Quick serve (auto-generate & open) |

---

## What's in the Report?

### ✅ For Every Test:
- 📸 **Screenshots** - Visual evidence
- 🎥 **Videos** - Full test recording
- 📝 **Step-by-step logs** - Detailed execution
- ⏱️ **Timings** - Performance data
- 🌍 **Environment info** - Browser, URLs, versions

### ✅ For Failed Tests:
- 🗜️ **Trace files** - Deep debugging info
- ❌ **Error messages** - Stack traces
- 🔍 **Failure details** - What went wrong

---

## Expected Test Count

✅ **26 Test Cases** - One per test file

If you see more than 26:
1. Old results weren't cleaned
2. Run: `npm run allure:clean`
3. Run: `npm run test:allure`

---

## File Locations

| Folder | Contents |
|--------|----------|
| `allure-results/` | Raw test results (JSON, screenshots, videos) |
| `allure-report/` | Generated HTML report |
| `test-results/` | Playwright native results |

---

## Configuration Settings

**Screenshots:** ✅ Enabled for all tests  
**Videos:** ✅ Enabled for all tests  
**Traces:** ✅ Enabled for failures  
**Auto-clean:** ✅ Enabled

---

## Viewing Attachments

1. Open report: `npm run test:allure`
2. Click any test case
3. Scroll to **"Attachments"** section
4. See: Screenshots, Videos, Logs

---

## Storage Optimization

### Current (Full Evidence):
```javascript
screenshot: 'on',    // All tests
video: 'on',         // All tests
```

### Lighter (Failures Only):
```javascript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

Change in `playwright.config.js` if needed.

---

## Troubleshooting

### ❌ Too many test cases shown
```bash
npm run allure:clean
npm run test:allure
```

### ❌ No screenshots/videos
- Check `playwright.config.js` settings
- Verify tests actually ran
- Check `allure-results/` for media files

### ❌ Report won't generate
```bash
npm install allure-commandline@latest --save-dev
npm install allure-playwright@latest --save-dev
```

---

## Full Documentation

📖 **Detailed Guide:** [ALLURE_SETUP.md](./ALLURE_SETUP.md)  
📊 **Fix Summary:** [ALLURE_FIX_SUMMARY.md](./ALLURE_FIX_SUMMARY.md)  
📚 **Project README:** [README.md](./README.md)

---

## Quick Tips

💡 Always use `npm run test:allure` for clean reports  
💡 26 tests = 26 test cases (verify in report)  
💡 Screenshots and videos are auto-attached  
💡 Traces help debug failures  
💡 Share `allure-report/` folder with team

---

**That's it! You're ready to use Allure Reports! 🎉**

