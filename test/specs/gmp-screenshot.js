var api_key = 'key-dc2760264d397127841bf41c00ac1902';
var domain = 'sandboxdd4b4191513b438785760d152d6ac0dc.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

describe('Test Suite', function () {
    it('Should do something', function () {
        return browser
            //.setViewportSize({width: 400, height: 1900})
            .url('https://account.greenmountainpower.com/#/public/login')
            .setValue('#spUsername','xxxxx')
            .setValue('#spPassword', 'xxxxxx')
            .click('button[type="submit"]')
            .waitForExist('#monthlyChart .c3-event-rect-13')
            .pause(3000)
            //.click('#monthlyChart .c3-event-rect-12')

            .getElementSize('#monthlyChart .c3-event-rect-13')
            //.execute(function () {
            //    return window.document.querySelector('#monthlyChart .c3-event-rect-13').attributes.width.value;
            //})
            .then(function (size) {
                var width = parseInt(size.width),
                    xOffset = (width / 2) + 1;
                var yOffset = size.height - 1;

                browser
                    .moveToObject('#monthlyChart .c3-event-rect-13',xOffset,yOffset)
                    .buttonPress(0);
            })

            .waitForExist('#dailyChart')
            .pause(2000)
            .scroll('h4=Monthly Usage')
            .saveScreenshot('daily-stats.png')

            //send the screen shot
            .then(function () {
                var data = {
                    from: 'Mailgun Sandbox <postmaster@sandboxdd4b4191513b438785760d152d6ac0dc.mailgun.org>',
                    to: 'allison.lazarz@dealer.com',
                    subject: 'Your Monthly & Daily GMP Stats',
                    inline: 'daily-stats.png',
                    html: '<html>Here are your stats: <img src="cid:daily-stats.png"></html>'
                };

                console.log('test message');

                return mailgun.messages().send(data, function (error, body) {

                    console.log('test data');
                    console.log(body);
                    console.log(error);
                });
            })
    });

});
