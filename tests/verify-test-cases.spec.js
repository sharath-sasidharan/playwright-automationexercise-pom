import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 7: Verify Test Cases Page', () => {
    let page;
    let testCasesPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        testCasesPO = poManager.getTestCasesPage();
    });

    test('Navigate to Test Cases page and verify', async () => {
        await testCasesPO.gotoHome();

        await testCasesPO.navigateToTestCases();
        await testCasesPO.verifyTestCasesPageLoaded();
        await testCasesPO.verifyTestCasesURL();
    });
});
