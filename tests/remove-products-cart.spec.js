import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 17: Remove Products From Cart', () => {
    let page;
    let poManager;
    let cartPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        poManager = new POManager(page);
        cartPO = poManager.getCartPage();
    });

    test('Remove products from cart', async () => {
        await cartPO.gotoHome();

        await cartPO.navigateToProducts();
        await cartPO.verifyAllProductsPageLoaded();
        await cartPO.addProductsToCart();

        await cartPO.navigateToCart();

        await cartPO.verifyCartPageLoaded();

        const initialCartItemsCount = await cartPO.getCartItemsCount();
        expect(initialCartItemsCount).toBeGreaterThanOrEqual(2);

        await cartPO.removeFirstProduct();

        await cartPO.verifyProductRemovedFromCart();
        
        const finalCartItemsCount = await cartPO.getCartItemsCount();
        expect(finalCartItemsCount).toBe(initialCartItemsCount - 1);

        await expect(page.locator('text=Shopping Cart')).toBeVisible();
        await expect(page.locator('#cart_info_table')).toBeVisible();
    });
});
