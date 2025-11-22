import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 9: Search Product', () => {
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

    test('Search for a product and verify results', async () => {
        await productsPO.gotoHome();

        await productsPO.navigateToProducts();
        await productsPO.verifyAllProductsPageLoaded();

        const searchTerm = 'Blue Top'; 
        await productsPO.searchProduct(searchTerm);

        await expect(page.locator('text=SEARCHED PRODUCTS')).toBeVisible();

        const searchResultsVisible = await productsPO.verifySearchResults();
        expect(searchResultsVisible).toBe(true);
    });
});
