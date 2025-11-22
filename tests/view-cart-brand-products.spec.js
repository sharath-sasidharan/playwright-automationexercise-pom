import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 19: View & Cart Brand Products', () => {
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

    test('View and cart brand products', async () => {
        await productsPO.gotoHome();

        await productsPO.navigateToProducts();

        const brandsVisible = await productsPO.verifyBrandsVisible();
        expect(brandsVisible).toBe(true);

        await productsPO.clickFirstBrand();

        const brandPageLoaded = await productsPO.verifyBrandPageLoaded();
        expect(brandPageLoaded).toBe(true);

        const brandProductsVisible = await productsPO.verifyProductsListVisible();
        expect(brandProductsVisible).toBe(true);

        await productsPO.clickSecondBrand();

        const secondBrandPageLoaded = await productsPO.verifyBrandPageLoaded();
        expect(secondBrandPageLoaded).toBe(true);

        const secondBrandProductsVisible = await productsPO.verifyProductsListVisible();
        expect(secondBrandProductsVisible).toBe(true);
    });
});
