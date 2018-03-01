var http = require('https');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});
var goodreadsService = function () {

    var getBookById = function (id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: `/book/show/${id}.xml?key=YOUR_KEY_HERE`
        };
        var callback = function (response) {
            var string = '';
            response.on('data', (chunk) => string += chunk);
            response.on('end', () => {
                parser.parseString(string, (err, result) => cb(null, result.GoodreadsResponse.book));
            });
        };

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;