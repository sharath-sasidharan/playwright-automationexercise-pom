// Page Object for Test Cases Page functionality

// Base URL
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

// Selectors
const SELECTORS = {
    // Navigation
    testCasesLink: 'a[href="/test_cases"]',
    
    // Test Cases page content
    testCasesPageTitle: 'text=Test Cases',
    testCasesContent: 'div.panel-group'
};

class TestCasesPage {
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
            console.log('Initial navigation failed, retrying with networkidle...');
            await this.page.goto(BASE_URL, { 
                waitUntil: 'networkidle',
                timeout: 60000 
            });
        }
    }

    async navigateToTestCases() {
        await this.page.click(SELECTORS.testCasesLink);
        await this.page.waitForSelector(SELECTORS.testCasesPageTitle);
    }

    async verifyTestCasesPageLoaded() {
        await this.page.waitForSelector(SELECTORS.testCasesPageTitle);
        await this.page.waitForSelector(SELECTORS.testCasesContent);
    }

    async verifyTestCasesURL() {
        await this.page.waitForURL(/.*test_cases.*/);
    }
}

export default TestCasesPage;
