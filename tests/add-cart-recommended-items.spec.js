import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';

test.describe('Test Case 22: Add to cart from Recommended items', () => {
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

    test('Add to cart from Recommended items and verify product in cart', async () => {
        await cartPO.gotoHome();

        await cartPO.scrollToBottom();

        const recommendedItemsVisible = await cartPO.verifyRecommendedItemsVisible();
        expect(recommendedItemsVisible).toBe(true);

        await cartPO.addRecommendedProductToCart();

        const productInCart = await cartPO.verifyRecommendedProductInCart();
        expect(productInCart).toBe(true);
    });
});
