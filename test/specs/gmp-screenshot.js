var api_key = 'key-dc2760264d397127841bf41c00ac1902',
    domain = 'sandboxdd4b4191513b438785760d152d6ac0dc.mailgun.org',
    mailgun = require('mailgun-js')({apiKey: api_key, domain: domain}),
    emailAddress = 'xxxxx',
    emailSubject = 'Your Monthly & Daily GMP Stats',
    //non-mailgun variables
    startURL = 'https://account.greenmountainpower.com/#/public/login',
    username = emailAddress,
    password = 'xxxxx',
    usernameField = '#spUsername',
    passwordField = '#spPassword',
    submitButton = 'button[type="submit"]',
    monthlyChart = '#monthlyChart .c3-event-rect-13',
    dailyChart = '#dailyChart',
    monthlyUsageText = 'h4=Monthly Usage',
    screenShot = 'daily-stats.png';
    cidScreenShot = 'cid:'+ screenShot;

describe('Test Suite', function () {
    it('Should take a screen shot of the Daily Stats then email a screen shot of the results to the logged in GMP user', function () {
        return browser
            .url(startURL)
            .setValue(usernameField,username)
            .setValue(passwordField, password)
            .click(submitButton)
            .waitForExist(monthlyChart)
            .pause(3000)
            .getElementSize(monthlyChart)
            .then(function (size) {
                var width = parseInt(size.width),
                    xOffset = (width / 2) + 1;
                var yOffset = size.height - 1;

                browser
                    .moveToObject(monthlyChart,xOffset,yOffset)
                    .buttonPress(0);
            })
            .waitForExist(dailyChart)
            .pause(2000)
            .scroll(monthlyUsageText)
            .saveScreenshot(screenShot)

            //send the screen shot
            .then(function () {
                var data = {
                    from: 'Daily GMP Stats <postmaster@sandboxdd4b4191513b438785760d152d6ac0dc.mailgun.org>',
                    to: emailAddress,
                    subject: emailSubject,
                    inline: screenShot,
                    html: '<html>Here are your stats: <img src="'+cidScreenShot+'"></html>'
                };

                return mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                    console.log(error);
                });
            })
    });

});
