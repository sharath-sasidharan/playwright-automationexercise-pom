import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 1: Register User', () => {
    let page;
    let registerPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        registerPO = poManager.getRegisterPage();
    });

    test('Register, verify and delete account', async () => {
        await registerPO.gotoHome();

        await registerPO.openSignupLogin();
        const unique = Math.floor(Math.random() * 1e9);
         await registerPO.startSignup(userData.testUser.firstName + ' ' + userData.testUser.lastName, `testuser_${unique}@example.com`);
        await registerPO.fillAccountInformation({
            password: userData.testUser.password,
            day: userData.testUser.birthDate.day,
            month: userData.testUser.birthDate.month,
            year: userData.testUser.birthDate.year,
            firstName: userData.testUser.firstName,
            lastName: userData.testUser.lastName,
            company: userData.testUser.company,
            address1: userData.testUser.address1,
            address2: userData.testUser.address2,
            country: userData.testUser.country,
            state: userData.testUser.state,
            city: userData.testUser.city,
            zipcode: userData.testUser.zipcode,
            mobile: userData.testUser.mobile
        });


        await registerPO.continueAfterAccountCreated();
        await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();

        await registerPO.deleteAccount();
        await expect(page).toHaveURL(/.*automationexercise\.com.*/);

    });
});


