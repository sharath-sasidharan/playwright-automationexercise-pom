const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

const SELECTORS = {
    productsLink: 'a[href="/products"]',
    allProductsPageTitle: 'text=All Products',
    productsList: '.features_items',
    firstProductViewButton: '.features_items .product-image-wrapper .choose a:has-text("View Product")',
    productDetailPage: '.product-details',
    productName: '.product-information h2',
    productCategory: '.product-information p:has-text("Category")',
    productPrice: '.product-information span span',
    productAvailability: '.product-information p:has-text("Availability")',
    productCondition: '.product-information p:has-text("Condition")',
    productBrand: '.product-information p:has-text("Brand")',
    writeYourReviewText: 'text=Write Your Review',
    reviewNameInput: '#name',
    reviewEmailInput: '#email',
    reviewTextarea: '#review',
    reviewSubmitButton: '#button-review',
    reviewSuccessMessage: 'text=Thank you for your review.',
    searchInput: '#search_product',
    searchButton: '#submit_search',
    searchedProductsTitle: 'text=SEARCHED PRODUCTS',
    searchResults: '.features_items .product-image-wrapper',
    categoriesSidebar: '.left-sidebar',
    womenCategory: 'a[href="#Women"]',
    womenCategoryLink: 'a[href="/category_products/1"]',
    dressCategoryLink: 'a[href="/category_products/1/Dress"]',
    dressCategoryLinkAlt: '.left-sidebar a:has-text("Dress")',
    menCategory: 'a[href="#Men"]',
    menSubCategory: 'a[href="/category_products/3"]',
    menSubCategoryAlt: '.left-sidebar a:has-text("Tshirts")',
    categoryPageTitle: '.title',
    womenTopsProducts: 'text=WOMEN - TOPS PRODUCTS',
    womenTopsProductsAlt: 'text=WOMEN - DRESS PRODUCTS',
    brandsSidebar: '.brands_products',
    brandLinks: '.brands_products a',
    brandPageTitle: '.title',
    brandProducts: '.features_items'
};

class ProductsPage {
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
        await this.page.waitForSelector(SELECTORS.productsList);
    }

    async verifyProductsListVisible() {
        await this.page.waitForSelector(SELECTORS.productsList);
        const productsCount = await this.page.locator(SELECTORS.productsList + ' .product-image-wrapper').count();
        return productsCount > 0;
    }

    async clickFirstProductView() {
        await this.page.click(SELECTORS.firstProductViewButton);
        await this.page.waitForSelector(SELECTORS.productDetailPage);
    }

    async verifyProductDetailPageLoaded() {
        await this.page.waitForSelector(SELECTORS.productDetailPage);
    }

    async verifyProductDetails() {
        // Verify product name
        await this.page.waitForSelector(SELECTORS.productName);
        
        // Verify product category
        await this.page.waitForSelector(SELECTORS.productCategory);
        
        // Verify product price
        await this.page.waitForSelector(SELECTORS.productPrice);
        
        // Verify product availability
        await this.page.waitForSelector(SELECTORS.productAvailability);
        
        // Verify product condition
        await this.page.waitForSelector(SELECTORS.productCondition);
        
        // Verify product brand
        await this.page.waitForSelector(SELECTORS.productBrand);
    }

    async searchProduct(productName) {
        await this.page.fill(SELECTORS.searchInput, productName);
        await this.page.click(SELECTORS.searchButton);
        await this.page.waitForSelector(SELECTORS.searchedProductsTitle);
    }

    async verifySearchResults() {
        await this.page.waitForSelector(SELECTORS.searchedProductsTitle);
        await this.page.waitForSelector(SELECTORS.searchResults);
        const searchResultsCount = await this.page.locator(SELECTORS.searchResults).count();
        return searchResultsCount > 0;
    }

    async getFirstProductName() {
        const firstProduct = this.page.locator(SELECTORS.productsList + ' .product-image-wrapper').first();
        const productName = await firstProduct.locator('p').first().textContent();
        return productName.trim();
    }

    // Category functionality
    async verifyCategoriesVisible() {
        await this.page.waitForSelector(SELECTORS.categoriesSidebar);
        return await this.page.locator(SELECTORS.categoriesSidebar).isVisible();
    }

    async clickWomenCategory() {
        await this.page.click(SELECTORS.womenCategory);
    }

    async clickDressCategory() {
        try {
            await this.page.click(SELECTORS.dressCategoryLink);
        } catch (error) {
            await this.page.click(SELECTORS.dressCategoryLinkAlt);
        }
    }

    async verifyWomenTopsProducts() {
        try {
            await this.page.waitForSelector(SELECTORS.womenTopsProducts);
            return await this.page.locator(SELECTORS.womenTopsProducts).isVisible();
        } catch (error) {
            await this.page.waitForSelector(SELECTORS.womenTopsProductsAlt);
            return await this.page.locator(SELECTORS.womenTopsProductsAlt).isVisible();
        }
    }

    async clickMenSubCategory() {
        try {
            await this.page.click(SELECTORS.menSubCategory);
        } catch (error) {
            await this.page.click(SELECTORS.menSubCategoryAlt);
        }
    }

    async verifyCategoryPageLoaded() {
        await this.page.waitForSelector(SELECTORS.categoryPageTitle);
        return await this.page.locator(SELECTORS.categoryPageTitle).isVisible();
    }

    // Brand functionality
    async verifyBrandsVisible() {
        await this.page.waitForSelector(SELECTORS.brandsSidebar);
        return await this.page.locator(SELECTORS.brandsSidebar).isVisible();
    }

    async clickFirstBrand() {
        const firstBrand = this.page.locator(SELECTORS.brandLinks).first();
        await firstBrand.click();
    }

    async clickSecondBrand() {
        const secondBrand = this.page.locator(SELECTORS.brandLinks).nth(1);
        await secondBrand.click();
    }

    async verifyBrandPageLoaded() {
        await this.page.waitForSelector(SELECTORS.brandPageTitle);
        await this.page.waitForSelector(SELECTORS.brandProducts);
        return await this.page.locator(SELECTORS.brandProducts).isVisible();
    }

    // Enhanced search functionality
    async verifySearchedProductsVisible() {
        await this.page.waitForSelector(SELECTORS.searchedProductsTitle);
        return await this.page.locator(SELECTORS.searchedProductsTitle).isVisible();
    }

    async verifyAllSearchedProductsVisible() {
        await this.page.waitForSelector(SELECTORS.searchResults);
        const searchResultsCount = await this.page.locator(SELECTORS.searchResults).count();
        return searchResultsCount > 0;
    }

    // Product review functionality
    async verifyWriteYourReviewVisible() {
        await this.page.waitForSelector(SELECTORS.writeYourReviewText);
        return await this.page.locator(SELECTORS.writeYourReviewText).isVisible();
    }

    async fillProductReview(reviewData) {
        await this.page.fill(SELECTORS.reviewNameInput, reviewData.name);
        await this.page.fill(SELECTORS.reviewEmailInput, reviewData.email);
        await this.page.fill(SELECTORS.reviewTextarea, reviewData.review);
    }

    async submitProductReview() {
        await this.page.click(SELECTORS.reviewSubmitButton);
    }

    async verifyReviewSuccessMessage() {
        await this.page.waitForSelector(SELECTORS.reviewSuccessMessage);
        return await this.page.locator(SELECTORS.reviewSuccessMessage).isVisible();
    }

    // Complete review flow
    async addProductReview(reviewData) {
        await this.verifyWriteYourReviewVisible();
        await this.fillProductReview(reviewData);
        await this.submitProductReview();
        await this.verifyReviewSuccessMessage();
    }
}

export default ProductsPage;
