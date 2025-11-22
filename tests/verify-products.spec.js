import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 8: Verify All Products and product detail page', () => {
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

    test('Navigate to products page and verify product details', async () => {
        await productsPO.gotoHome();

        await productsPO.navigateToProducts();
        await productsPO.verifyAllProductsPageLoaded();

        const productsVisible = await productsPO.verifyProductsListVisible();
        expect(productsVisible).toBe(true);

        await productsPO.clickFirstProductView();
        await productsPO.verifyProductDetailPageLoaded();

        await productsPO.verifyProductDetails();
    });
});
