var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    url = require('url');

var rootDir = process.argv[2] || '.';

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    console.log('Error handling request', req.url);
    res.end('Error handling request');
});

var server = http.createServer(function(req, res) {
    urlParts = url.parse(req.url, true, true);
    var testMatch = urlParts.pathname.match("^/(test/.+)");
    if (testMatch) {
        var testFile = testMatch[1];
        console.log('test request', testFile);
        fs.readFile(rootDir + '/' + testFile, function (err, data) {
            if (err) {
                res.statusCode = 404;
            } else {
                res.write(data);
            }
            res.end();
        });

        return;
    }

    var targetHost = urlParts.host;

    console.log('normal request', targetHost, req.url);

    var protocol = req.url.split('//')[0];
    var target = protocol + '//' + targetHost;
    proxy.web(req, res, { target: target });
});

console.log("listening on port 6000");
server.listen(6000);
