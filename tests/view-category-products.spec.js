import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 18: View Category Products', () => {
    let page;
    let poManager;
    let productsPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        poManager = new POManager(page);
        productsPO = poManager.getProductsPage();
    });

    test('View category products', async () => {
        await productsPO.gotoHome();

        const categoriesVisible = await productsPO.verifyCategoriesVisible();
        expect(categoriesVisible).toBe(true);

        await productsPO.clickWomenCategory();

        await productsPO.navigateToProducts();
        await productsPO.verifyAllProductsPageLoaded();

        const productsVisible = await productsPO.verifyProductsListVisible();
        expect(productsVisible).toBe(true);

        const categoriesStillVisible = await productsPO.verifyCategoriesVisible();
        expect(categoriesStillVisible).toBe(true);

      
        await expect(page.locator('text=All Products')).toBeVisible();
    });
});
