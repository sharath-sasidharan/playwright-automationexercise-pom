class PageHelpers {
    static async safeAction(page, action, actionName = 'action', timeout = 10000) {
        if (page.isClosed()) return false;
        
        try {
            await action();
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async safeWaitForSelector(page, selector, options = {}) {
        if (page.isClosed()) return false;
        
        try {
            await page.waitForSelector(selector, { timeout: 10000, ...options });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async safeClick(page, selector, options = {}) {
        if (page.isClosed()) return false;
        
        try {
            await page.click(selector, { timeout: 10000, ...options });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async safeFill(page, selector, value, options = {}) {
        if (page.isClosed()) return false;
        
        try {
            await page.fill(selector, value, { timeout: 10000, ...options });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async safeNavigation(page, url, options = {}) {
        if (page.isClosed()) return false;
        
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000, ...options });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async retryAction(action, maxRetries = 3, delay = 1000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await action();
                return true;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        return false;
    }
    
    static async waitForPageLoad(page, timeout = 15000) {
        if (page.isClosed()) return false;
        
        try {
            await page.waitForLoadState('domcontentloaded', { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    static async isElementVisible(page, selector, timeout = 5000) {
        if (page.isClosed()) return false;
        
        try {
            await page.waitForSelector(selector, { state: 'visible', timeout });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default PageHelpers;
