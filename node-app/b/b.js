'use strict';

var async = require("async");

console.log("before async");

function myWaitForThisFunction(callback) {
    console.log("myWaitForThisFunction");
}
function myThenDoThisFunction(callback) {
    console.log("myThenDoThisFunction");
}

async.series([
    function(callback) {
        myWaitForThisFunction(callback);
    },
    function(callback) {
        myThenDoThisFunction(callback);
    }
]);

console.log("after async");
