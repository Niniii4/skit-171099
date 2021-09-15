import {BasePageObject} from "./BasePageObject";
import {by, element} from "protractor";

export class OnlineShoppingPage extends BasePageObject {
    private allCategoriesButton = element(by.cssContainingText("a", "Vse Kategorije"));
    private subCategoryLocator = element(by.xpath("//*[@id=\"header\"]/div[4]/div/div[2]/ul[2]/div[3]/div/li[2]/a/span"));
    private thirdLevelSubCategoryLocator = element(by.xpath("//*[@id=\"header\"]/div[4]/div/div[2]/ul[3]/div[3]/div/li[2]/a/span"));
    private productsInActionsLocator = element(by.xpath("//*[@id=\"header\"]/div[1]/div[3]/ul/li[1]/label"));
    private searchField = element(by.id("input_SearchBox"));
    private searchButton = element(by.className("searchBtn"));
    private sortingField = element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/label"));

    public async clickAllCategoriesButton(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.allCategoriesButton);
    }

    public async clickCategory(category: string): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.cssContainingText(".flyout-categories__item", category)));
    }

    public async clickSubCategory(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.subCategoryLocator);
    }

    public async clickSubCategoryById(index: number): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.xpath("/html/body/div[5]/div[2]/div[4]/div/div[2]/ul[2]/div[3]/div/li[" + index + "]/a/span")));
    }

    public async clickThirdLevelSubCategory(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.thirdLevelSubCategoryLocator);
    }

    public async clickProductsInAction(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.productsInActionsLocator);
    }

    public async clickSubCategoryInAction(subcategory: string): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.cssContainingText("a", subcategory)));
    }

    public async searchByKeyword(keyword: string): Promise<void> {
        await this.clearInputFieldAndType(this.searchField, keyword);
    }

    public async clickSearchButton() : Promise<void>{
        await this.waitForElementToBeClickableAndClick(this.searchButton);
    }

    public async clickSortingField(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.sortingField);
    }

    public async clickSortingOption(index: number): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/ul/li["+index+"]")));
    }

    public async clickFilteringOption(index: number): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[1]/div[2]/div/div[" + index + "]/div[1]/span")));
    }

    public async getFilteringOptionName(index: number): Promise<string>{
         let name = await element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[2]/ul/li["+index+"]/a/span[2]")).getText();
         return String(name.replace(" ", "+"));
    }

    public async chooseFilteringOption(index: number): Promise<void>{
        await this.waitForElementToBeClickableAndClick(element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[1]/div[2]/div/div["+index+"]/div[2]/ul/li["+index+"]/a/span[1]")));
    }

    public async clickGoToLogin(): Promise<void>{
        await this.waitForElementToBeClickableAndClick(element(by.className("ico-user")));
    }
}