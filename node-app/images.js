/*
get header images from rijks museum.
Get maybe 100 and write to a file.
*/

'use strict';

var APP = APP || {};

APP.keys = {
    COLLECTION_URL: "https://www.rijksmuseum.nl/api/en/collection",
    API_KEY: "3yLwaBE9",
    ITEMS_PER_PAGE: 100   // default is 100, max is 100
};

APP.data = [];

APP.images = [];

var request = require('request');
var fs = require("fs");

var addUniqueImages = function(images) {
    if (APP.images.indexOf(images) === -1) {
        APP.images.push(images);
    }
};

var getCollectionByPage = function(page, maxItems) {
    console.log(">>> getCollectionByPage; page "+page+" maxItems "+maxItems);
    request({
        url: APP.keys.COLLECTION_URL,
        qs: {key: APP.keys.API_KEY, format: 'json', ps: APP.keys.ITEMS_PER_PAGE, p: page},
        method: 'GET',
        headers: {}
    },
    function(error, response, body) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        else {
//            console.log("getCollectionByPage; status code "+response.statusCode);
            if (response.statusCode != 200) {
                console.log("getCollectionByPage; bad Status Code "+response.statusCode);
                process.exit(1);
            }

            var json = JSON.parse(body);
            console.log("number of items "+json.artObjects ? json.artObjects.length : 0);
            if (! json.artObjects || json.artObjects.length < 1) {
                allCollectionDone();
                return;
            }
            json.artObjects.forEach(function(item) {
                if (item.webImage && item.webImage.url && item.webImage.width > item.webImage.height + 200) {
                    if (APP.images.length < maxItems) {
                        addUniqueImages(item.webImage.url);
                    }
                }
            });

            if (APP.images.length >= maxItems) {
                allCollectionDone();
                return;
            }

            page++;
            getCollectionByPage(page, maxItems);

        }
    });
    console.log("<<< getCollectionByPage; page "+page);
};

var allCollectionDone = function() {
    console.log(">>> allCollectionDone");
    console.log("total number of images "+APP.images.length);
    APP.images.sort(function(a, b) {
        return a.localeCompare(b);
    });

    var writeStream = fs.createWriteStream('data.json');
    APP.images.forEach(function(item) {
        writeStream.write(JSON.stringify(item)+'\n');
    });
    writeStream.end();

    console.log("<<< allCollectionDone");
};

getCollectionByPage(0, 5);

console.log("ending");
