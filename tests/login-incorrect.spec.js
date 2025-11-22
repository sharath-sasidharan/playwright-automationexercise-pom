import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Login User with incorrect email and password', () => {
    let page;
    let po;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        po = new POManager(page).getRegisterPage();
    });

    test('Test Case 3: Login with incorrect credentials and verify error message', async () => {
        await po.gotoHome();

        await po.openSignupLogin();
        await expect(page.locator('text=Login to your account')).toBeVisible();

        await po.loginWithIncorrectCredentials('wrong@example.com', 'wrongpassword');
        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });
});
