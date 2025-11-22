import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 4: Logout User', () => {
    let page;
    let po;
    let email;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        po = new POManager(page).getRegisterPage();

        try {
            const unique = Math.floor(Math.random() * 1e9);
            email = `logout_user_${unique}@example.com`;
            await po.gotoHome();
            await po.openSignupLogin();
            await po.startSignup('Logout User', email);
            await po.fillAccountInformation({
                password: userData.testUser.password,
                day: userData.testUser.birthDate.day,
                month: userData.testUser.birthDate.month,
                year: '1990',
                firstName: 'Logout',
                lastName: 'User',
                company: userData.testUser.company,
                address1: userData.testUser.address1,
                address2: 'Apt 1',
                country: 'United States',
                state: 'CA',
                city: 'Los Angeles',
                zipcode: '90001',
                mobile: userData.testUser.mobile,
            });
            await po.continueAfterAccountCreated();
            await po.logout(); 
        } catch (error) {
            throw error;
        }
    });

    test.afterEach(async () => {
        try {
          
            if (!page.isClosed()) {
                await po.gotoHome();
                await po.logoutIfLoggedIn(); // Ensure logged out before attempting to delete
                await po.openSignupLogin();
                await po.login(email, userData.testUser.password); // Log in to delete
                await po.deleteAccount();
            }
        } catch (error) {
            // Cleanup failed
        }
    });

    test('Test Case 4: Logout user after successful login', async () => {
        await po.gotoHome();

        await po.login(email, userData.testUser.password);

        await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();

        await po.logout();

        await expect(page.locator('text=Login to your account')).toBeVisible();
        await expect(page).toHaveURL(/login/);
    });
});
