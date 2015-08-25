/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global require*/

function renderAsset(res, fs, mime, page, startPath, srcDirectory) {
    "use strict";

    var src,
        filestream;

    if (page.substr(0, startPath.length) === startPath) {
        src = __dirname + '/../' + srcDirectory + '/' + page.substr(startPath.length, page.length);

        fs.stat(src, function (err) {
            if (null !== err) {
                res.writeHead(404, {});
                res.write('<h1>404</h1><h2>File not found!</h2>');
                res.end();
            } else {
                res.setHeader('Content-type', mime.lookup(src));

                filestream = fs.createReadStream(src);
                filestream.pipe(res);
            }
        });

        return true;
    }

    return false;
}

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    nunjucks;

http.createServer(function (req, res) {
    'use strict';

    var page = url.parse(req.url).pathname;

    if (renderAsset(res, fs, mime, page, '/assets/', 'assets')) {
        return;
    }

    if (renderAsset(res, fs, mime, page, '/css/', 'css')) {
        return;
    }

    if (renderAsset(res, fs, mime, page, '/bower_components/', 'bower_components')) {
        return;
    }

    if (renderAsset(res, fs, mime, page, '/js/', 'js')) {
        return;
    }

    if (renderAsset(res, fs, mime, page, '/fonts/', 'fonts')) {
        return;
    }

    nunjucks = require('nunjucks');
    nunjucks.configure({ autoescape: true });

    if (page === '/' || page === 'index.html') {
        res.setHeader('Content-type', 'text/html');
        res.write(nunjucks.render('examples/index.html'));
        res.end();
        return;
    }

    res.write('<h1>404</h1><h2>File not found!</h2>');
    res.end();
}).listen(9000);
