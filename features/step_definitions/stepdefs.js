const { Given, When, Then, AfterAll} = require('@cucumber/cucumber');
const {Builder} = require("selenium-webdriver");
const assert = require("assert");
const {GithubPO} = require("../../src/GithubPO.js")


Given('I am on Github main page', async function() {
    this.driver = new Builder().forBrowser("firefox").build();
    this.githubPage = new GithubPO(this.driver);
})

When('I search for {string}', {timeout: 15 * 1000}, async function(searchTerm) {
    await this.githubPage.search(searchTerm);
});

Then("Repository name or description should include {string}",  {timeout: 10 * 1000}, async function(keyWords) {
    let reposInfo = await this.githubPage.getReposInfo();
    let results = [];
    let keys = keyWords.split(',');
    for (const key of keys) {
        let keyResults = [];
        for (const repoInfo of reposInfo) {
            let repoResult = repoInfo.repoName.includes(key);
            repoResult = repoResult || repoInfo.repoDescription.includes(key);
            keyResults.push(repoResult);
        }
        let keyResult = keyResults.reduce((acc, x) => acc || x);
        results.push(keyResult);
    }
    let isValid = results.reduce( (acc, x) => acc && x);
    assert(isValid);
    await this.driver.close();
});
