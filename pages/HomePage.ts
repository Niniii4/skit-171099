import {BasePageObject} from "./BasePageObject";
import {browser, by, element} from "protractor";

export class HomePage extends BasePageObject {
    private acceptCookies = element(by.cssContainingText("#cmpbntyestxt", "Strinjam se"));
    private skipTypeOfPayment = element(by.cssContainingText(".obBtn", "PRESKOČI IZBIRO"));

    public async clickAcceptCookies(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.acceptCookies)
    }

    public async clickSkip(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.skipTypeOfPayment);
    }
}