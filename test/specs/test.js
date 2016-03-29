describe('Test Suite', function () {
    it('Should do something', function () {
        return browser
            .url('https://account.greenmountainpower.com/#/public/login')
            .setValue('#spUsername','xxxx')
            .setValue('#spPassword', 'xxxx')
            .click('button[type="submit"]')
            .waitForVisible('#monthlyChart .c3-bar-13')
            .moveToObject('#monthlyChart .c3-bar-13')
            .buttonPress()
            .waitForExist('#dailyChart .c3-bar-13');

    });
});

//.then(function () {
//    var chartBar = casper.getElementInfo('#monthlyChart .c3-bar-13');
//    casper.mouse.click(chartBar.x, chartBar.y);
//})