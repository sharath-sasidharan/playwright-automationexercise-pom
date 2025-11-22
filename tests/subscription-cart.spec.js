import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 11: Verify Subscription in Cart page', () => {
    let page;
    let subscriptionPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        subscriptionPO = poManager.getSubscriptionPage();
    });

    test('Verify subscription functionality on cart page', async () => {
        try {
            await subscriptionPO.gotoHome();

            await subscriptionPO.navigateToCart();

            const email = `test_${Date.now()}@example.com`;
            await subscriptionPO.performSubscription(email);
        } catch (error) {
            console.log('Test failed with error:', error.message);
            throw error;
        }
    });
});
