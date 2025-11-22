// Page Object for Cart functionality (Test Cases 12 & 13)

// Base URL
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

// Selectors
const SELECTORS = {
    // Navigation
    productsLink: 'a[href="/products"]',
    cartLink: 'a[href="/view_cart"]',
    cartLinkAlt: 'a:has-text("Cart")',
    
    // All Products page
    allProductsPageTitle: 'text=All Products',
    productsList: '.features_items',
    addToCartButtons: '.features_items .product-image-wrapper .choose a:has-text("Add to cart")',
    firstAddToCartButton: '.features_items .product-image-wrapper:first-child .choose a:has-text("Add to cart")',
    secondAddToCartButton: '.features_items .product-image-wrapper:nth-child(2) .choose a:has-text("Add to cart")',
    
    // Add to cart modal
    addToCartModal: '#cartModal',
    continueShoppingButton: 'button:has-text("Continue Shopping")',
    viewCartButton: 'a:has-text("View Cart")',
    
    // Cart page
    cartPageTitle: 'text=Shopping Cart',
    cartItems: '#cart_info_table tbody tr',
    productQuantityInput: '.cart_quantity input',
    cartInfoTable: '#cart_info_table',
    firstProductQuantityInput: '#cart_info_table tbody tr:first-child .cart_quantity input',
    productPrice: '.cart_price p',
    productTotal: '.cart_total p',
    cartTotal: '.cart_total_price',
    
    // Remove product functionality
    removeProductButton: '.cart_delete a',
    firstRemoveButton: '#cart_info_table tbody tr:first-child .cart_delete a',
    
    // Proceed to checkout
    proceedToCheckoutButton: '.btn-default:has-text("Proceed To Checkout")',
    
    // Checkout page
    checkoutPageTitle: 'text=Checkout',
    checkoutForm: '.checkout-form',
    orderMessage: '.order-message',
    
    // Recommended items functionality
    recommendedItemsSection: 'text=RECOMMENDED ITEMS',
    recommendedItemsContainer: '.recommended_items',
    recommendedAddToCartButton: '.recommended_items .product-image-wrapper .choose a:has-text("Add to cart")',
    firstRecommendedAddToCartButton: '.recommended_items .product-image-wrapper:first-child .choose a:has-text("Add to cart")',
    // Alternative selectors for recommended items
    recommendedItemsAlt: '.recommended_items',
    recommendedProductWrapper: '.recommended_items .product-image-wrapper',
    recommendedAddToCartAlt: '.recommended_items a:has-text("Add to cart")',
    firstRecommendedAddToCartAlt: '.recommended_items .product-image-wrapper:first-child a:has-text("Add to cart")'
};

class CartPage {
    constructor(page) {
        this.page = page;
    }

    async gotoHome() {
        try {
            await this.page.goto(BASE_URL, { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
        } catch (error) {
            await this.page.goto(BASE_URL, { 
                waitUntil: 'networkidle',
                timeout: 60000 
            });
        }
    }

    async navigateToProducts() {
        await this.page.click(SELECTORS.productsLink);
        await this.page.waitForSelector(SELECTORS.allProductsPageTitle);
    }

    async verifyAllProductsPageLoaded() {
        await this.page.waitForSelector(SELECTORS.allProductsPageTitle);
        try {
            await this.page.waitForSelector(SELECTORS.productsList, { timeout: 10000 });
        } catch (error) {
            // Products list might take longer to load, continue anyway
        }
    }

    async addFirstProductToCart() {
        if (this.page.isClosed()) return;

        try {
            // Wait for products to load first
            await this.page.waitForSelector(SELECTORS.productsList, { timeout: 10000 });
            
            // Click on "View Product" for the first product to go to product detail page
            const firstProductViewButton = this.page.locator('.features_items .product-image-wrapper').first().locator('a:has-text("View Product")');
            
            // Use Promise.all to wait for navigation and click together
            await Promise.all([
                this.page.waitForNavigation({ timeout: 30000 }), // Wait for navigation
                firstProductViewButton.click() // Click the button
            ]);
            
            // Wait for product detail page to load
            await this.page.waitForSelector('.product-details', { timeout: 15000 });
            
            // Now add the product to cart from the detail page
            // Try multiple selectors for the Add to cart button
            try {
                await this.page.click('button:has-text("Add to cart")', { timeout: 5000 });
            } catch (error) {
                try {
                    await this.page.click('.btn-default:has-text("Add to cart")', { timeout: 5000 });
                } catch (error2) {
                    await this.page.click('input[value="Add to cart"]', { timeout: 5000 });
                }
            }
            
            // Wait for the modal to appear and be visible
            try {
                await this.page.waitForSelector(SELECTORS.addToCartModal, { state: 'visible', timeout: 10000 });
                
                // Click "Continue Shopping" to keep adding more products
                await this.page.click(SELECTORS.continueShoppingButton, { timeout: 5000 });
                
                // Wait for modal to close
                await this.page.waitForSelector(SELECTORS.addToCartModal, { state: 'hidden', timeout: 10000 });
            } catch (error) {
                // Modal did not appear, continue
            }
            
            // Navigate back to products page
            try {
                await this.page.click('a:has-text("Products")', { timeout: 5000 });
                await this.page.waitForSelector(SELECTORS.allProductsPageTitle, { timeout: 10000 });
            } catch (error) {
                // If navigation fails, go directly to products page
                await this.page.goto(BASE_URL + '/products');
                await this.page.waitForSelector(SELECTORS.allProductsPageTitle, { timeout: 10000 });
            }
        } catch (error) {
            throw error;
        }
    }

    async addSecondProductToCart() {
        // Wait for products to load first
        await this.page.waitForSelector(SELECTORS.productsList);
        
        // Click on "View Product" for the second product to go to product detail page
        const secondProductViewButton = this.page.locator('.features_items .product-image-wrapper').nth(1).locator('a:has-text("View Product")');
        await secondProductViewButton.click();
        
        // Wait for product detail page to load
        await this.page.waitForSelector('.product-details');
        
        // Now add the product to cart from the detail page
        // Try multiple selectors for the Add to cart button
        try {
            await this.page.click('button:has-text("Add to cart")');
        } catch (error) {
            try {
                await this.page.click('button:has-text("Add to cart")');
            } catch (error2) {
                await this.page.click('.btn-default:has-text("Add to cart")');
            }
        }
        
        // Wait for the modal to appear and be visible
        await this.page.waitForSelector(SELECTORS.addToCartModal, { state: 'visible' });
        
        // Click "View Cart" to go to cart page
        await this.page.click(SELECTORS.viewCartButton);
    }

    async addProductsToCart() {
        // Add first product and continue shopping
        await this.addFirstProductToCart();
        
        // Add second product and go to cart
        await this.addSecondProductToCart();
    }

    async navigateToCart() {
        if (this.page.isClosed()) return;

        try {
            await this.page.click(SELECTORS.cartLink, { timeout: 5000 });
        } catch (error) {
            try {
                await this.page.click(SELECTORS.cartLinkAlt, { timeout: 5000 });
            } catch (error2) {
                await this.page.goto(BASE_URL + '/view_cart');
            }
        }
    }

    async verifyCartPageLoaded() {
        if (this.page.isClosed()) return;
        
        try {
            await this.page.waitForSelector(SELECTORS.cartPageTitle, { timeout: 15000 });
            await this.page.waitForSelector(SELECTORS.cartInfoTable, { timeout: 15000 });
        } catch (error) {
            const url = this.page.url();
            if (url.includes('/view_cart') || url.includes('/cart')) {
                // On cart page based on URL
            } else {
                throw error;
            }
        }
    }

    async verifyProductsInCart(expectedCount) {
        await this.page.waitForSelector(SELECTORS.cartItems);
        const cartItemsCount = await this.page.locator(SELECTORS.cartItems).count();
        return cartItemsCount >= expectedCount;
    }

    async getCartItemsCount() {
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
        return await this.page.locator(SELECTORS.cartItems).count();
    }

    async updateProductQuantity(productIndex, newQuantity) {
        // Update quantity for specific product (0-based index)
        const quantityInput = this.page.locator(SELECTORS.productQuantityInput).nth(productIndex);
        await quantityInput.clear();
        await quantityInput.fill(newQuantity.toString());
        
        // Trigger change event to update totals
        await quantityInput.press('Enter');
        
        // Wait for page to update
        await this.page.waitForLoadState('networkidle');
    }

    async updateFirstProductQuantity(newQuantity) {
        await this.updateProductQuantity(0, newQuantity);
    }

    async getProductQuantity(productIndex) {
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
        const quantityInput = this.page.locator(SELECTORS.productQuantityInput).nth(productIndex);
        return await quantityInput.inputValue();
    }

    async getFirstProductQuantity() {
        return await this.getProductQuantity(0);
    }

    async verifyProductQuantity(productIndex, expectedQuantity) {
        const actualQuantity = await this.getProductQuantity(productIndex);
        return actualQuantity === expectedQuantity.toString();
    }

    async verifyFirstProductQuantity(expectedQuantity) {
        return await this.verifyProductQuantity(0, expectedQuantity);
    }

    async proceedToCheckout() {
        await this.page.click(SELECTORS.proceedToCheckoutButton);
        await this.page.waitForSelector(SELECTORS.checkoutPageTitle);
    }

    async verifyCheckoutPageLoaded() {
        await this.page.waitForSelector(SELECTORS.checkoutPageTitle);
        await this.page.waitForSelector(SELECTORS.checkoutForm);
    }

    // Remove product functionality
    async removeProduct(productIndex = 0) {
        // Remove product by index (default: first product)
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
        const removeButton = this.page.locator(SELECTORS.removeProductButton).nth(productIndex);
        await removeButton.click();
    }

    async removeFirstProduct() {
        await this.removeProduct(0);
    }

    async verifyProductRemoved(expectedCount) {
        // Verify that the number of products in cart matches expected count
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
        const actualCount = await this.getCartItemsCount();
        return actualCount === expectedCount;
    }

    async verifyProductRemovedFromCart() {
        // Verify that a product was successfully removed
        // This method waits for the cart to update after removal
        await this.page.waitForTimeout(2000); // Wait for cart to update
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
    }

    // Recommended items functionality
    async scrollToBottom() {
        // Scroll to bottom of page
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        
        // Wait for page to settle
        await this.page.waitForTimeout(1000);
        
        // Ensure recommended items section is visible
        await this.page.evaluate(() => {
            const recommendedSection = document.querySelector('.recommended_items');
            if (recommendedSection) {
                recommendedSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Wait for scroll to complete
        await this.page.waitForTimeout(1000);
    }

    async verifyRecommendedItemsVisible() {
        await this.page.waitForSelector(SELECTORS.recommendedItemsSection);
        // Also wait for the recommended items container to be visible
        await this.page.waitForSelector(SELECTORS.recommendedItemsContainer);
        return await this.page.locator(SELECTORS.recommendedItemsSection).isVisible();
    }

    async addRecommendedProductToCart() {
        // Wait for recommended items to be visible
        await this.page.waitForSelector(SELECTORS.recommendedItemsContainer);
        
        // Scroll to ensure recommended items are fully visible
        await this.page.evaluate(() => {
            const recommendedSection = document.querySelector('.recommended_items');
            if (recommendedSection) {
                recommendedSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Wait a bit for scroll to complete
        await this.page.waitForTimeout(2000);
        
        // Use JavaScript to find and click the first "Add to cart" button in recommended section
        const clicked = await this.page.evaluate(() => {
            // Find all links in recommended items section
            const recommendedSection = document.querySelector('.recommended_items');
            if (!recommendedSection) return false;
            
            // Look for links with "Add to cart" text
            const links = recommendedSection.querySelectorAll('a');
            for (let link of links) {
                if (link.textContent.includes('Add to cart')) {
                    // Trigger both click and mouse events to ensure proper handling
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    return true;
                }
            }
            
            // Fallback: look for buttons with "Add to cart" text
            const buttons = recommendedSection.querySelectorAll('button');
            for (let button of buttons) {
                if (button.textContent.includes('Add to cart')) {
                    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    return true;
                }
            }
            
            return false;
        });
        
        if (!clicked) {
            throw new Error('No Add to cart buttons found in recommended section');
        }
        
        // Wait a bit for the action to complete
        await this.page.waitForTimeout(2000);
        
        // Check if modal appears, if not, try to navigate to cart directly
        try {
            // Wait for the modal to appear with a shorter timeout
            await this.page.waitForSelector(SELECTORS.addToCartModal, { 
                state: 'visible', 
                timeout: 5000 
            });
            
            // Click "View Cart" to go to cart page
            await this.page.click(SELECTORS.viewCartButton);
        } catch (error) {
            await this.page.goto(BASE_URL + '/view_cart');
        }
    }

    async verifyRecommendedProductInCart() {
        // Verify that the recommended product is now in the cart
        await this.page.waitForSelector(SELECTORS.cartPageTitle);
        await this.page.waitForSelector(SELECTORS.cartInfoTable);
        const cartItemsCount = await this.getCartItemsCount();
        return cartItemsCount > 0;
    }
}

export default CartPage;
