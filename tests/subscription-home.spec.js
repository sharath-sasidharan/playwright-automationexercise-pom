import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 10: Verify Subscription in home page', () => {
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

    test('Verify subscription functionality on home page', async () => {
        await subscriptionPO.gotoHome();

        const email = `test_${Date.now()}@example.com`;
        await subscriptionPO.performSubscription(email);
    });
});
