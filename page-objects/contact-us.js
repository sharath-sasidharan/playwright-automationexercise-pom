// Page Object for Contact Us Form functionality
import path from 'path';
// Base URL
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

// Selectors
const SELECTORS = {
    // Navigation
    contactUsLink: 'a[href="/contact_us"]',
    homeLink: 'a[href="/"]',
    
    // Contact form
    getInTouchText: 'text=GET IN TOUCH',
    nameInput: 'input[placeholder="Name"]',
    emailInput: 'input[placeholder="Email"]',
    subjectInput: 'input[placeholder="Subject"]',
    messageTextarea: '#message',
    fileUploadInput: 'input[name="upload_file"]',
    submitButton: '//input[@name="submit"]',
    
    // Success message
    successMessage: 'text=Success! Your details have been submitted successfully.',
    
    // Alert dialog
    alertDialog: 'div.alert-success'
};

class ContactUsPage {
    constructor(page) {
        this.page = page;
    }

    async gotoHome() {
        try {
            await this.page.goto(BASE_URL, { timeout: 30000 });
        } catch (error) {
            // Retry once if navigation fails
            await this.page.goto(BASE_URL, { timeout: 60000 });
        }
    }

    async navigateToContactUs() {
        await this.page.click(SELECTORS.contactUsLink);
        await this.page.waitForSelector(SELECTORS.getInTouchText);
    }

    async fillContactForm({ name, email, subject, message }) {
        await this.page.fill(SELECTORS.nameInput, name);
        await this.page.fill(SELECTORS.emailInput, email);
        await this.page.fill(SELECTORS.subjectInput, subject);
        await this.page.fill(SELECTORS.messageTextarea, message);
    }

    async uploadFile(filePath) {
        // Resolve the file path relative to project root
        const resolvedPath = path.resolve(process.cwd(), filePath);
        await this.page.setInputFiles(SELECTORS.fileUploadInput, resolvedPath);
    }

    async submitForm() {
        // Set up dialog handler in case a dialog appears
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        
        // Click the submit button
        await this.page.click(SELECTORS.submitButton);
        
        // Wait for form submission to complete
        await this.page.waitForTimeout(2000);
    }

    async navigateToHome() {
        await this.page.click(SELECTORS.homeLink);
        await this.page.waitForLoadState('networkidle');
    }

    async verifySuccessMessage() {
        await this.page.waitForSelector(SELECTORS.successMessage);
    }

    async verifyGetInTouchVisible() {
        await this.page.waitForSelector(SELECTORS.getInTouchText);
    }

    async verifyHomePageLoaded() {
        // Verify we're back on home page by checking for home page elements
        await this.page.waitForSelector('div.slider');
    }
}

export default ContactUsPage;
