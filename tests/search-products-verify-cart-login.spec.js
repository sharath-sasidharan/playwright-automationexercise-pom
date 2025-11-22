import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {
    let page;
    let poManager;
    let productsPO;
    let cartPO;
    let registerPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        poManager = new POManager(page);
        productsPO = poManager.getProductsPage();
        cartPO = poManager.getCartPage();
        registerPO = poManager.getRegisterPage();
    });

    test('Search products and verify cart after login', async () => {
        try {
            await productsPO.gotoHome();

            await productsPO.navigateToProducts();

            await productsPO.verifyAllProductsPageLoaded();

            const productName = 'Blue Top';
            await productsPO.searchProduct(productName);

            const searchedProductsVisible = await productsPO.verifySearchedProductsVisible();
            expect(searchedProductsVisible).toBe(true);

            const allSearchedProductsVisible = await productsPO.verifyAllSearchedProductsVisible();
            expect(allSearchedProductsVisible).toBe(true);

            await cartPO.addProductsToCart();

            await cartPO.navigateToCart();
            await cartPO.verifyCartPageLoaded();

            const cartItemsCountBeforeLogin = await cartPO.getCartItemsCount();
            expect(cartItemsCountBeforeLogin).toBeGreaterThanOrEqual(2);

            const unique = Math.floor(Math.random() * 1e9);
            const email = `testuser_${unique}@example.com`;
            
            await registerPO.openSignupLogin();
            await registerPO.startSignup(`${userData.testUser.firstName} ${userData.testUser.lastName}`, email);
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

            try {
                await cartPO.navigateToCart();
            } catch (error) {
                await page.goto(BASE_URL + '/view_cart');
            }

            await cartPO.verifyCartPageLoaded();
            const cartItemsCountAfterLogin = await cartPO.getCartItemsCount();
            expect(cartItemsCountAfterLogin).toBeGreaterThanOrEqual(2);

            expect(cartItemsCountAfterLogin).toBe(cartItemsCountBeforeLogin);

            await registerPO.deleteAccount();
            
            await expect(page).toHaveURL(/.*automationexercise\.com.*/);
        } catch (error) {
            try {
                await registerPO.deleteAccount();
            } catch (cleanupError) {
                // Cleanup failed
            }
            throw error;
        }
    });
});
