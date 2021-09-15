import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {browser} from "protractor";
import {LoginPage} from "../pages/LoginPage";

describe('Test Requirement 8 - Go to login page, unsuccessfully login and unsuccessfully register', () => {

    let homePage: HomePage = new HomePage();
    let onlineShoppingPage: OnlineShoppingPage = new OnlineShoppingPage();
    let loginPage: LoginPage = new LoginPage();

    it('should to Spar online shopping', async () => {
        await browser.get('https://www.spar.si/online/welcome/');
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain('online');
    });

    it('should skip type of payment', async () => {
        await homePage.clickAcceptCookies();
        await homePage.clickSkip();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain('spar');
    });

    it('should go to login', async () => {
        await onlineShoppingPage.clickGoToLogin();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain('login');
    });

    it('should login unsuccessfully', async () => {
        await loginPage.insertLoginUsername("user@user.com");
        await loginPage.insertLoginPassword("user");
        await loginPage.clickLoginButton();
        let errorLoggingIn = await loginPage.getLoginErrorMessage();
        expect(errorLoggingIn).toContain("ni pravilno")
    });

    it('should loyalty register unsuccessfully', async () => {
        await loginPage.insertLoyaltyUsername("user");
        await loginPage.insertLoyaltyPassword("user");
        await loginPage.clickLoyaltyButton();
        const errorLoyalty = await loginPage.getLoyaltyErrorMessage();
        expect(errorLoyalty.every(message => message.endsWith("ni veljavna"))).toEqual(true);
    })
});