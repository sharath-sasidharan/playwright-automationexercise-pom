import { test, expect } from '@playwright/test';
import POManager from '../page-objects/po-manager';
const contactData = require('../test-data/contact-data.json');

test.describe('Test Case 6: Contact Us Form', () => {
    let page;
    let contactUsPO;

    test.afterAll(async () => {
        if (page) await page.close();
    });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const poManager = new POManager(page);
        contactUsPO = poManager.getContactUsPage();
    });

    test('Submit contact form with file upload', async () => {
        await contactUsPO.gotoHome();

        await contactUsPO.navigateToContactUs();
        await contactUsPO.verifyGetInTouchVisible();

        const contactFormData = contactData.contactForm;
        await contactUsPO.fillContactForm({
            name: contactFormData.name,
            email: contactFormData.email,
            subject: contactFormData.subject,
            message: contactFormData.message
        });
        await contactUsPO.uploadFile('test-data/upload_file.txt');
        
        await contactUsPO.submitForm();

        await page.waitForTimeout(2000);

        // await contactUsPO.verifySuccessMessage();

        // // 11. Click Home button and verify landed to home page
        // await contactUsPO.navigateToHome();
        // await contactUsPO.verifyHomePageLoaded();
    });
});
