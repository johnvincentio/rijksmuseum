'use strict';

var Promise = require("promise");

var firstMethod = function() {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('first method completed');
            resolve({
                data: '123'
            });
        }, 2000);
    });
    return promise;
};


var secondMethod = function(someStuff) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('second method completed');
            resolve({
                newData: someStuff.data + ' some more data'
            });
        }, 2000);
    });
    return promise;
};

var thirdMethod = function(someStuff) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('third method completed');
            resolve({
                result: someStuff.newData
            });
        }, 3000);
    });
    return promise;
};

firstMethod()
    .then(secondMethod)
    .then(thirdMethod);






//var Promise = require("promise");
//
//function stats (file) {
//  return new Promise((resolve, reject) => {
//    fs.stat(file, (err, data) => {
//      if (err) {
//        return reject (err);
//      }
//      resolve(data);
//    })
//  })
//}
//
//Promise.all([
//  stats('file1'),
//  stats('file2'),
//  stats('file3')
//])
//.then((data) => console.log(data))
//.catch((err) => console.log(err));
//

/*
var request = require('request');

var jv = function(page) {
    console.log(">>> jv");
    request({
        url: APP.keys.COLLECTION_URL,
        qs: {key: APP.keys.API_KEY, format: 'json', ps: 100, p: page},
        method: 'GET',
        headers: {}
    },
    function(error, response, body) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        else {
//            console.log(response.statusCode, body);
            console.log("about to add data");
            APP.data.push(body);
        }
    });
    console.log("<<< jv");
};
*/
