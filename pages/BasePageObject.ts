import {browser, by, ElementFinder, ExpectedConditions} from "protractor";

export abstract class BasePageObject {

    protected async clearInputFieldAndType(selector: ElementFinder, text: string): Promise<void> {
        await this.waitForElementToBeClickableAndClick(selector);
        await selector.clear();
        await selector.sendKeys(text);
    }

    protected async waitForElementToBeClickableAndClick(selector: ElementFinder): Promise<void> {
        await browser.wait(ExpectedConditions.elementToBeClickable(selector), 10000,
            `Element ${selector.locator().value} was not CLICKABLE within 10 seconds...`
        );
        await selector.click();
    }

    protected async waitForElementToBeInvisible(selector: ElementFinder): Promise<void> {
        await browser.wait(ExpectedConditions.invisibilityOf(selector), 10000,
            `Element ${selector.locator().value} did not become INVISIBLE within 10 seconds...`
        );
    }

    protected async isElementDisplayed(selector: ElementFinder, timeout = 2000): Promise<boolean> {
        return new Promise(resolve => {
            browser.wait(ExpectedConditions.visibilityOf(selector), timeout)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    protected async selectDropdownOptionByIndex(selector: ElementFinder, index: number): Promise<void> {
        selector.all(by.tagName('option')).then(options => {
            options[index].click();
        });
    }

}
