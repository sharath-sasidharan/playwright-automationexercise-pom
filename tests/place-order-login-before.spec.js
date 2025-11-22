import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 16: Place Order - Login before Checkout', () => {
    let page;
    let poManager;
    let cartPO;
    let registerPO;
    let checkoutPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        poManager = new POManager(page);
        cartPO = poManager.getCartPage();
        registerPO = poManager.getRegisterPage();
        checkoutPO = poManager.getCheckoutPage();
    });

    test('Place order with login before checkout', async () => {
        try {
          
            await checkoutPO.gotoHome();

            await registerPO.openSignupLogin();

          
            const unique = Math.floor(Math.random() * 1e9);
            const email = `testuser_${unique}@example.com`;
            const name = userData.testUser.firstName + ' ' + userData.testUser.lastName;
            
            await registerPO.startSignup(name, email);
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

            await registerPO.logoutIfLoggedIn();

            await registerPO.login(email, userData.testUser.password);

            await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();

            await cartPO.navigateToProducts();
            await cartPO.verifyAllProductsPageLoaded();
            await cartPO.addProductsToCart();

            await cartPO.navigateToCart();

            await cartPO.verifyCartPageLoaded();

            await checkoutPO.proceedToCheckout();

            await checkoutPO.verifyAddressDetailsAndReviewOrder();

            
            await expect(page.locator('text=Checkout')).toBeVisible();
            

            await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();

          
            await registerPO.deleteAccount();

           
            await expect(page).toHaveURL(/.*automationexercise\.com.*/);
        } catch (error) {
            try {
                if (!page.isClosed()) {
                    await registerPO.deleteAccount();
                }
            } catch (cleanupError) {
                // Cleanup failed
            }
            throw error;
        }
    });
});
