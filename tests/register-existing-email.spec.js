import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 5: Register User with existing email', () => {
    let page;
    let po;
    let existingEmail;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        po = new POManager(page).getRegisterPage();

        const unique = Math.floor(Math.random() * 1e9);
        existingEmail = `existing_user_${unique}@example.com`;
        
        await po.gotoHome();
        await po.openSignupLogin();
        await po.startSignup('Existing User', existingEmail);
        await po.fillAccountInformation({
            password: userData.testUser.password,
            day: userData.testUser.birthDate.day,
            month: userData.testUser.birthDate.month,
            year: userData.testUser.birthDate.year,
            firstName: 'Existing',
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
        await po.logout(); 
    });

    test.afterEach(async () => {
        await po.gotoHome();
        await po.logoutIfLoggedIn();
        await po.openSignupLogin();
        await po.login(existingEmail, userData.testUser.password);
        await po.deleteAccount();
    });

    test('Register with existing email and verify error message', async () => {
        await po.gotoHome();

        await po.openSignupLogin();
        await expect(page.locator('text=New User Signup!')).toBeVisible();

        await po.startSignupWithExistingEmail('New User', existingEmail);
        await expect(page.locator('text=Email Address already exist!')).toBeVisible();
    });
});
