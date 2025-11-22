// Page Object for Automation Exercise Register/Delete Account flow

// URLs
const BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';

// Selectors kept outside of constructor
const SELECTORS = {
    // Home
    homeSlider: 'div.slider',
    signupLoginLink: 'a[href="/login"]',

    // Signup/Login page
    newUserSignupText: 'text=New User Signup!',
    signupNameInput: 'input[placeholder="Name"]',
    signupEmailInput: 'input[placeholder="Email Address"]:nth-child(3)',
    signupButton: 'button[data-qa="signup-button"]',
    existingEmailError: 'text=Email Address already exist!',

    // Enter Account Information
    enterAccountInformationText: 'text=Enter Account Information',
    titleMrRadio: '#id_gender1',
    passwordInput: '#password',
    daysSelect: '#days',
    monthsSelect: '#months',
    yearsSelect: '#years',
    newsletterCheckbox: '#newsletter',
    optinCheckbox: '#optin',

    // Address info
    firstName: '#first_name',
    lastName: '#last_name',
    company: '#company',
    address1: '#address1',
    address2: '#address2',
    country: '#country',
    state: '#state',
    city: '#city',
    zipcode: '#zipcode',
    mobileNumber: '#mobile_number',
    createAccountButton: 'button[data-qa="create-account"]',

    // Account created
    accountCreatedText: 'text=Account Created!',
    continueButton: 'a[data-qa="continue-button"]',

    // Logged in
    loggedInAs: 'a:has-text("Logged in as")',

    // Delete account
    deleteAccountLink: 'a[href="/delete_account"]',
    accountDeletedText: 'text=Account Deleted!',
    accountDeletedContinueButton: 'a[data-qa="continue-button"]',

    // Login existing user
    loginToYourAccountText: 'text=Login to your account',
    loginEmailInput: 'input[data-qa="login-email"]',
    loginPasswordInput: 'input[data-qa="login-password"]',
    loginButton: 'button[data-qa="login-button"]',
    logoutLink: 'a[href="/logout"]',
    loginErrorMessage: 'text=Your email or password is incorrect!'
};

class RegisterPage {
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
        // await this.page.waitForSelector(SELECTORS.homeSlider);
    }

    async openSignupLogin() {
        if (this.page.isClosed()) return;
        
        try {
            await this.page.click(SELECTORS.signupLoginLink, { timeout: 10000 });
        } catch (error) {
            throw error;
        }
    }

    async startSignup(name, email) {
        await this.page.fill(SELECTORS.signupNameInput, name);
        await this.page.fill(SELECTORS.signupEmailInput, email);
        await this.page.click(SELECTORS.signupButton);
        //await this.page.waitForSelector(SELECTORS.enterAccountInformationText);
    }

    async startSignupWithExistingEmail(name, email) {
        await this.page.fill(SELECTORS.signupNameInput, name);
        await this.page.fill(SELECTORS.signupEmailInput, email);
        await this.page.click(SELECTORS.signupButton);
        // Wait for error message instead of account information page
        await this.page.waitForSelector(SELECTORS.existingEmailError);
    }

    async fillAccountInformation({
        title = 'Mr',
        password,
        day = '1',
        month = 'January',
        year = '2000',
        newsletter = true,
        offers = true,
        firstName,
        lastName,
        company,
        address1,
        address2 = '',
        country = 'Canada',
        state,
        city,
        zipcode,
        mobile
    }) {
        if (title === 'Mr') await this.page.check(SELECTORS.titleMrRadio);
        await this.page.fill(SELECTORS.passwordInput, password);
        await this.page.selectOption(SELECTORS.daysSelect, { label: day });
        await this.page.selectOption(SELECTORS.monthsSelect, { label: month });
        await this.page.selectOption(SELECTORS.yearsSelect, { label: year });
        if (newsletter) {
            try {
                await this.page.check(SELECTORS.newsletterCheckbox);
            } catch (error) {
                // Newsletter checkbox is optional, continue if it fails
            }
        }
        if (offers) {
            try {
                await this.page.check(SELECTORS.optinCheckbox);
            } catch (error) {
                // Offers checkbox is optional, continue if it fails
            }
        }

        await this.page.fill(SELECTORS.firstName, firstName);
        await this.page.fill(SELECTORS.lastName, lastName);
        if (company) await this.page.fill(SELECTORS.company, company);
        await this.page.fill(SELECTORS.address1, address1);
        if (address2) await this.page.fill(SELECTORS.address2, address2);
        await this.page.selectOption(SELECTORS.country, { label: country });
        await this.page.fill(SELECTORS.state, state);
        await this.page.fill(SELECTORS.city, city);
        await this.page.fill(SELECTORS.zipcode, zipcode);
        await this.page.fill(SELECTORS.mobileNumber, mobile);
        
        try {
            await this.page.click(SELECTORS.createAccountButton);
            //await this.page.waitForSelector(SELECTORS.accountCreatedText);
        } catch (error) {
            // If create account button fails, try alternative approach
            await this.page.press(SELECTORS.createAccountButton, 'Enter');
        }
    }

    async continueAfterAccountCreated() {
        try {
            await this.page.click(SELECTORS.continueButton);
            await this.page.waitForSelector(SELECTORS.loggedInAs);
        } catch (error) {
            // If continue button fails, try to navigate to home page
            await this.page.goto(BASE_URL);
            await this.page.waitForSelector(SELECTORS.loggedInAs);
        }
    }

    async deleteAccount() {
        await this.page.waitForSelector(SELECTORS.deleteAccountLink, { timeout: 10000 });
        await this.page.click(SELECTORS.deleteAccountLink);
        
        await this.page.waitForSelector(SELECTORS.accountDeletedText, { timeout: 10000 });
        await this.page.click(SELECTORS.accountDeletedContinueButton);
    }

    // Login flows
    async logout() {
        if (this.page.isClosed()) return;
        
        try {
            await this.page.click(SELECTORS.logoutLink, { timeout: 10000 });
            await this.page.waitForSelector(SELECTORS.loginToYourAccountText, { timeout: 10000 });
        } catch (error) {
            throw error;
        }
    }

    async logoutIfLoggedIn() {
        if (await this.page.locator(SELECTORS.logoutLink).isVisible().catch(()=>false)) {
            await this.logout();
        }
    }

    async login(email, password) {
        if (this.page.isClosed()) return;
        
        try {
            await this.openSignupLogin();
            await this.page.fill(SELECTORS.loginEmailInput, email);
            await this.page.fill(SELECTORS.loginPasswordInput, password);
            await this.page.click(SELECTORS.loginButton);
            await this.page.waitForSelector(SELECTORS.loggedInAs, { timeout: 15000 });
        } catch (error) {
            throw error;
        }
    }

    async loginWithIncorrectCredentials(email, password) {
        await this.openSignupLogin();
        await this.page.fill(SELECTORS.loginEmailInput, email);
        await this.page.fill(SELECTORS.loginPasswordInput, password);
        await this.page.click(SELECTORS.loginButton);
        // Wait for error message instead of success
        await this.page.waitForSelector(SELECTORS.loginErrorMessage);
    }
}

export default RegisterPage;


