// Page Object for Subscription functionality (Test Cases 10 & 11)

// Base URL
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

// Selectors
const SELECTORS = {
    // Navigation
    cartLink: 'a[href="/view_cart"]',
    cartLinkAlt: 'a:has-text("Cart")',
    
    // Footer and subscription
    footer: 'footer',
    subscriptionText: 'text=SUBSCRIPTION',
    subscriptionEmailInput: '#susbscribe_email',
    subscriptionButton: '#subscribe',
    
    // Success message
    successMessage: 'text=You have been successfully subscribed!'
};

class SubscriptionPage {
    constructor(page) {
        this.page = page;
    }

    async gotoHome() {
        try {
            await this.page.goto(BASE_URL, { timeout: 60000 });
        } catch (error) {
            // Retry once with longer timeout
            await this.page.goto(BASE_URL, { timeout: 90000 });
        }
    }

    async navigateToCart() {
        try {
            // Try primary cart link selector
            await this.page.click(SELECTORS.cartLink, { timeout: 5000 });
        } catch (error) {
            // Try alternative cart link selector
            await this.page.click(SELECTORS.cartLinkAlt, { timeout: 5000 });
        }
        // Wait for cart page to load instead of network idle
        await this.page.waitForSelector('text=Shopping Cart');
    }

    async scrollToFooter() {
        await this.page.locator(SELECTORS.footer).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

    async verifySubscriptionTextVisible() {
        await this.page.waitForSelector(SELECTORS.subscriptionText);
    }

    async subscribeWithEmail(email) {
        await this.page.fill(SELECTORS.subscriptionEmailInput, email);
        await this.page.click(SELECTORS.subscriptionButton);
    }

    async verifySuccessMessage() {
        await this.page.waitForSelector(SELECTORS.successMessage, { timeout: 10000 });
    }

    // Common method for subscription flow
    async performSubscription(email) {
        await this.scrollToFooter();
        await this.verifySubscriptionTextVisible();
        await this.subscribeWithEmail(email);
        await this.verifySuccessMessage();
    }
}

export default SubscriptionPage;
