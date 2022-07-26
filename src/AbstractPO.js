class AbstractPO {
    constructor(driver, pageAddress) {
        this.driver = driver;
        this.address = pageAddress;
    }

    async openPage() {
        await this.driver.get(this.address);
        await this.driver.manage().setTimeouts( { implicit: 2000 } );
    }

    async getTitle() {
        title = await this.driver.title;
        return title;
    }

    async closePage() {
        await this.driver.close();
    }
}

module.exports.AbstractPO = AbstractPO;