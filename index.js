const {Builder, WebElement, By, Key, util} = require("selenium-webdriver");
const assert = require("assert");

(async function() {
    let driver = new Builder().forBrowser("firefox").build();
    await driver.get("https://github.com");

    let search_header = await driver.findElement(By.className("header-search-input"));
    await search_header.sendKeys("QA_6_WebDriver", Key.RETURN);
    await driver.manage().setTimeouts( { implicit: 5000 } );

    let repositories = await driver.findElements(By.className("repo-list-item"));
    for (repo of repositories) {
        let elem = await repo.findElement(By.className("v-align-middle"));
        let repo_name = await elem.getText();
        let testRegex = new RegExp('.+\/qa.*6.*webdriver', 'i');
        assert.match(repo_name, testRegex);
    }
    console.log("Test passed");
    await driver.close()
})();