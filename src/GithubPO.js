const {Builder, By, Key} = require("selenium-webdriver");
const {AbstractPO} = require("./AbstractPO.js");

class GithubPO extends AbstractPO {
    constructor(driver) {
        super(driver, "https://github.com");
        this.openPage();
    }

    async getSearchHeader() {
        let searchHeader = await this.driver.findElement(By.name("q"));
        searchHeader.clear()
        return searchHeader;
    }

    async search(searchInput) {
        let searchHeader = await this.getSearchHeader();
        await searchHeader.sendKeys(searchInput, Key.RETURN);
        await this.driver.manage().setTimeouts( { implicit: 2000 } );
    }

    async getRepos() {
        let repositories = await this.driver.findElements(By.className("repo-list-item"));
        return repositories;
    }

    async getReposInfo() {
        let repositories = await this.getRepos()
        let reposInfo = [];
        for(const repo of repositories) {
            let repoInfo = {};
            let repoTitle = await repo.findElement(By.css("a"));
            let repoName = await repoTitle.getText();
            repoInfo.repoName = repoName.toLowerCase();
            try {
                let repoDescrObj = await repo.findElement(By.css("p"));
                let repoDescription = await repoDescrObj.getText();
                repoInfo.repoDescription = repoDescription.toLowerCase();
            } catch (error) {
                repoInfo.repoDescription = '';
            }
            reposInfo.push(repoInfo);
        }
        return reposInfo;
    }
}

module.exports.GithubPO = GithubPO;