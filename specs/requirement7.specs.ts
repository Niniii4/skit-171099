import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {browser} from "protractor";
// @ts-ignore
import * as searchData from "../data/searchData.json";

describe('Test Requirement 7 - sort products by search with DDT', () => {

    let homePage: HomePage = new HomePage();
    let onlineShoppingPage: OnlineShoppingPage = new OnlineShoppingPage();

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

    searchData.forEach((item) => {
        it('should search by keyword and sort by index option', async () => {
            await onlineShoppingPage.searchByKeyword(item.keyword);
            await onlineShoppingPage.clickSearchButton();
            let currentUrl = await browser.getCurrentUrl();
            expect(currentUrl).toContain(item.keyword);
        });

        it('should sort the given response', async () => {
            await onlineShoppingPage.clickSortingField();
            browser.sleep(3000);
            await onlineShoppingPage.clickSortingOption(item.sortingOption);
            browser.sleep(3000);
            let currentUrl = await browser.getCurrentUrl();
            expect(currentUrl).toContain('sort');
        });

        xit('should filter the given response', async () => {
            await onlineShoppingPage.clickFilteringOption(item.filteringOption);
            browser.sleep(3000);
            let currentFilteringOptionName = await onlineShoppingPage.getFilteringOptionName(item.filteringOption);
            await onlineShoppingPage.chooseFilteringOption(item.filteringOption);
            browser.sleep(5000);
            let currentUrl = await browser.getCurrentUrl();
            expect(currentUrl).toContain(currentFilteringOptionName);
        })
    });

    it('should close browser', async () => {
        browser.close();
    });
});