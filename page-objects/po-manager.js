// Central Page Object manager exposing page-specific objects
import RegisterPage from './register';
import ContactUsPage from './contact-us';
import TestCasesPage from './test-cases';
import ProductsPage from './products';
import SubscriptionPage from './subscription';
import CartPage from './cart';
import CheckoutPage from './checkout';
import ScrollPage from './scroll';

class POManager {
    constructor(page) {
        this.page = page;
    }

    getRegisterPage() {
        return new RegisterPage(this.page);
    }

    getContactUsPage() {
        return new ContactUsPage(this.page);
    }

    getTestCasesPage() {
        return new TestCasesPage(this.page);
    }

    getProductsPage() {
        return new ProductsPage(this.page);
    }

    getSubscriptionPage() {
        return new SubscriptionPage(this.page);
    }

    getCartPage() {
        return new CartPage(this.page);
    }

    getCheckoutPage() {
        return new CheckoutPage(this.page);
    }

    getScrollPage() {
        return new ScrollPage(this.page);
    }
}

export default POManager;


