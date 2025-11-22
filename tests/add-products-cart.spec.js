import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 12: Add Products to Cart', () => {
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

    test('Add products to cart and verify', async () => {
        await cartPO.gotoHome();

        await cartPO.navigateToProducts();
        await cartPO.verifyAllProductsPageLoaded();
        await cartPO.addFirstProductToCart();
        await cartPO.addSecondProductToCart();
        await cartPO.verifyCartPageLoaded();
        const cartItemsCount = await cartPO.getCartItemsCount();

        expect(cartItemsCount).toBeGreaterThanOrEqual(2);
        await expect(page.locator('text=Shopping Cart')).toBeVisible();
         const cartItems = page.locator('#cart_info_table tbody tr');
        const itemsCount = await cartItems.count();
        
        expect(itemsCount).toBeGreaterThanOrEqual(2);

        for (let i = 0; i < itemsCount; i++) {
            const item = cartItems.nth(i);
            await expect(item.locator('.cart_price p')).toBeVisible();
            await expect(item.locator('.cart_total p')).toBeVisible();
        }
    });
});
