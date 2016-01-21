var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs-extra'),
    url = require('url');

var rootDir = process.argv[2] || '.';

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    console.log('Error handling request', req.url, err.msg);
    res.end('Error handling request');
});

function handleGet(req, res) {
    urlParts = url.parse(req.url, true, true);
    var urlPath = urlParts.pathname.substring(1);
    var filePath = rootDir + '/' + urlPath;
    var fileFound = fs.existsSync(filePath);
    if (fileFound) {
        serveLocalFile(filePath, res);
    } else {
        proxyRequest(req, res);
    }
}

function handlePut(req, res) {
    urlParts = url.parse(req.url, true, true);
    var urlPath = urlParts.pathname.substring(1);
    var filePath = rootDir + '/' + urlPath;

    var requestBody = '';
    req.on('data', function(data) {
        requestBody += data;
    });
    req.on('end', function() {
        fs.outputFile(filePath, requestBody, function(err) {
            if (err) {
                writeErrorResponse(res, err);
            }
            res.end();
        });
    });
}

function serveLocalFile(filePath, res) {
    console.log('local file', filePath);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            writeErrorResponse(res, err);
        } else {
            res.write(data);
        }
        res.end();
    });

}

function proxyRequest(req, res) {
    var urlParts = url.parse(req.url, true, true);
    var targetHost = urlParts.host;

    console.log('proxying request', targetHost, req.url);

    var protocol = req.url.split('//')[0];
    var target = protocol + '//' + targetHost;
    proxy.web(req, res, { target: target });
}

function writeErrorResponse(res, err) {
    res.writeHead(500, err.message, {'Content-Type': 'text/html'});
    res.write('<!doctype html><html><head><title>Error</title></head><body>' + err.message + '</body></html>');

}

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'GET':
            handleGet(req, res);
            break;
        case 'PUT':
            handlePut(req, res);
            break;
        default:
            proxyRequest(req, res);
    }
});

console.log("listening on port 6000");
server.listen(6000);
