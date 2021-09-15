import {BasePageObject} from "./BasePageObject";
import {browser, by, element} from "protractor";

export class LoginPage extends BasePageObject {
    private loginFieldUsername = element(by.id("username"));
    private loginFieldPassword = element(by.id("password"));
    private loginFieldButton = element(by.id("loginPageLoginSubmit"));
    private loyaltyFieldUsername = element(by.id("loyaltyNumber"));
    private loyaltyFieldPassword = element(by.id("birthdate-loyalty"));
    private loyaltyFieldButton = element(by.className("j-loyaltyLoginBtn"));
    private loyaltyErrorUsername = element(by.xpath("/html/body/div[7]/div[3]/div[4]/div[2]/div[2]/div/form/div[1]/div/div[2]/span"));
    private loyaltyErrorPassword = element(by.xpath("/html/body/div[7]/div[3]/div[4]/div[2]/div[2]/div/form/div[2]/div[2]/span"));

    public async insertLoginUsername(username: string): Promise<void> {
        browser.sleep(2000);
        await this.clearInputFieldAndType(this.loginFieldUsername, username);
    }

    public async insertLoginPassword(password: string): Promise<void> {
        browser.sleep(2000);
        await this.clearInputFieldAndType(this.loginFieldPassword, password);
    }

    public async clickLoginButton(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.loginFieldButton);
    }

    public async getLoginErrorMessage(): Promise<string>{
        let errorMessage = await element(by.xpath("//*[@id=\"globalMessagesPopup\"]/div")).getText();
        return String(errorMessage);
    }

    public async insertLoyaltyUsername(username: string): Promise<void> {
        browser.sleep(2000);
        await this.clearInputFieldAndType(this.loyaltyFieldUsername, username);
    }

    public async insertLoyaltyPassword(password: string): Promise<void> {
        browser.sleep(2000);
        await this.clearInputFieldAndType(this.loyaltyFieldPassword, password);
    }

    public async clickLoyaltyButton(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.loyaltyFieldButton);
    }

    public async getLoyaltyErrorMessage(): Promise<string[]>{
        browser.sleep(2000);
        let errorMessageUsername = await this.loyaltyErrorUsername.getText();
        let errorMessagePassword = await this.loyaltyErrorPassword.getText();
        return Array(errorMessageUsername, errorMessagePassword);
    }

}