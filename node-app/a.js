/*
get data from rijks museum
577654 items in the collection

French names require special handling:
"Étienne-Maurice Falconet"
*/
/*
getting all the detail records is not feasible.

Thus, only get the collection records and save to file.
*/

'use strict';

var APP = APP || {};

APP.keys = {
    COLLECTION_URL: "https://www.rijksmuseum.nl/api/en/collection",
    API_KEY: "3yLwaBE9",
    ITEMS_PER_PAGE: 100   // default is 100, max is 100
};

APP.data = [];

APP.artists = [];

var request = require('request');
var fs = require("fs");

var writeData = function(file, data) {
    var writeStream = fs.createWriteStream(file);
    writeStream.write(JSON.stringify(data));
    writeStream.end();
};

var addUniqueArtist = function(artist) {
    if (APP.artists.indexOf(artist) === -1) {
        APP.artists.push(artist);
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
                APP.data.push({'objectNumber': item.objectNumber, 'data' : item});
            });

            page++;
            if (APP.data.length < maxItems) {
                getCollectionByPage(page, maxItems);
            }
            else {
                allCollectionDone();
            }
        }
    });
    console.log("<<< getCollectionByPage; page "+page);
};

var allCollectionDone = function() {
    console.log(">>> allCollectionDone");
    console.log("total number of items "+APP.data.length);

    APP.data.forEach(function(item) {
//        console.log("item.objectNumber "+item.objectNumber);
//        console.log("principalOrFirstMaker "+item.data.principalOrFirstMaker);
        addUniqueArtist(item.data.principalOrFirstMaker);
    });

    console.log("total number of artists "+APP.artists.length);
//    console.log("before artists sort");
    APP.artists.sort(function(a, b) {
        return a.localeCompare(b);
    });
/*
    APP.artists.forEach(function(artist) {
        console.log(artist);
    });
*/

    console.log("total number of items "+APP.data.length);
    writeData ("artists.json", APP.artists);
    writeData ("data.json", APP.data);

//    console.log("artists sorted\n");

/*
The following takes too long...
    getCollectionByIndex(0);
*/
    console.log("<<< allCollectionDone");
};

getCollectionByPage(0, 10000000);

console.log("ending");

/*
var getCollectionByIndex = function(idx) {
    console.log(">>> getCollectionByIndex; idx "+idx);
    var item = APP.data[idx];
    request({
        url: APP.keys.COLLECTION_URL + "/" + item.objectNumber,
        qs: {key: APP.keys.API_KEY, format: 'json'},
        method: 'GET',
        headers: {}
    },
    function(error, response, body) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        else {
//            console.log("getCollectionByIndex; status code "+response.statusCode);
            if (response.statusCode != 200) {
                console.log("getCollectionByIndex; bad Status Code "+response.statusCode);
                process.exit(1);
            }

            var json = JSON.parse(body);
//            console.log("about to add item data");
            item.artObject = json.artObject;
            item.artObjectPage = json.artObjectPage;

            idx++;
            if (idx < APP.data.length) {
                getCollectionByIndex(idx);
            }
            else {
                allCollectionByIndexDone();
            }
        }
    });
    console.log("<<< getCollectionByIndex; idx "+idx);
};

var allCollectionByIndexDone = function() {
    console.log(">>> allCollectionByIndexDone");
    console.log("total number of items "+APP.data.length);
    writeData ("artists.json", APP.artists);
    writeData ("data.json", APP.data);
    console.log("<<< allCollectionByIndexDone");
};
*/
