import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 2: Login User with correct email and password', () => {
    let page;
    let po;
    let email;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        po = new POManager(page).getRegisterPage();

        const unique = Math.floor(Math.random() * 1e9);
        email = `login_user_${unique}@example.com`;
        await po.gotoHome();
        await po.openSignupLogin();
        await po.startSignup('Login User', email);
        await po.fillAccountInformation({
            password: userData.testUser.password,
            day: userData.testUser.birthDate.day,
            month: userData.testUser.birthDate.month,
            year: userData.testUser.birthDate.year,
            firstName: 'Login',
            lastName: 'User',
            company: userData.testUser.company,
            address1: userData.testUser.address1,
            address2: userData.testUser.address2,
            country: userData.testUser.country,
            state: userData.testUser.state,
            city: userData.testUser.city,
            zipcode: userData.testUser.zipcode,
            mobile: userData.testUser.mobile
        });
        await po.continueAfterAccountCreated();
        await po.logoutIfLoggedIn();
    });

    test('Login and verify, then delete account', async () => {
        await po.login(email, userData.testUser.password);

        await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();

        await po.deleteAccount();
        await expect(page).toHaveURL(/automationexercise\.com/);
    });
});


