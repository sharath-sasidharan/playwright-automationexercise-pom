import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    let page;
    let scrollPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        scrollPO = poManager.getScrollPage();
    });

    test('Verify scroll up without arrow button and scroll down functionality', async () => {
      
        await scrollPO.gotoHome();

        const homePageVisible = await scrollPO.verifyHomePageLoaded();
        expect(homePageVisible).toBe(true);

        await scrollPO.scrollToBottom();

        const subscriptionVisible = await scrollPO.verifySubscriptionVisible();
        expect(subscriptionVisible).toBe(true);

        const topPageVisible = await scrollPO.scrollUpWithoutArrowButton();
        expect(topPageVisible).toBe(true);
    });
});
