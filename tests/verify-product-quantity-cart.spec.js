import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 13: Verify Product Quantity in Cart', () => {
    let page;
    let cartPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        cartPO = poManager.getCartPage();
    });

    test('Verify product quantity in cart', async () => {
        await cartPO.gotoHome();

        await cartPO.navigateToProducts();
        await cartPO.verifyAllProductsPageLoaded();

        await cartPO.addProductsToCart();

        await cartPO.verifyCartPageLoaded();

        const cartItemsCount = await cartPO.getCartItemsCount();
        expect(cartItemsCount).toBeGreaterThanOrEqual(2);

        await expect(page.locator('text=Shopping Cart')).toBeVisible();
        await expect(page.locator('#cart_info_table')).toBeVisible();

        
        await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(cartItemsCount);
    });
});
