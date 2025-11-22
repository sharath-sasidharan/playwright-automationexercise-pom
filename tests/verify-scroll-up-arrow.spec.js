import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
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

    test('Verify scroll up using arrow button and scroll down functionality', async () => {
        await scrollPO.gotoHome();

        const homePageVisible = await scrollPO.verifyHomePageLoaded();
        expect(homePageVisible).toBe(true);

        await scrollPO.scrollToBottom();

        const subscriptionVisible = await scrollPO.verifySubscriptionVisible();
        expect(subscriptionVisible).toBe(true);

        const topPageVisible = await scrollPO.scrollUpWithArrowButton();
        expect(topPageVisible).toBe(true);
    });
});
