import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const userData = require('../test-data/user-data.json');

test.describe('Test Case 21: Add review on product', () => {
    let page;
    let productsPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        productsPO = poManager.getProductsPage();
    });

    test('Add review on product and verify success message', async () => {
        await productsPO.gotoHome();

        await productsPO.navigateToProducts();

        await productsPO.verifyAllProductsPageLoaded();

        await productsPO.clickFirstProductView();

        await productsPO.verifyWriteYourReviewVisible();

        const unique = Math.floor(Math.random() * 1e9);
        const reviewData = {
            ...userData.reviewData,
            email: `reviewer_${unique}@example.com`
        };
        await productsPO.addProductReview(reviewData);

        const successMessageVisible = await productsPO.verifyReviewSuccessMessage();
        expect(successMessageVisible).toBe(true);
    });
});
