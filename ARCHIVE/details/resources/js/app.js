'use strict';

var APP = APP || {};

$(function() {

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    var testQuery = function(id) {
        APP.model.details.getDataFromApiForItem(id, function() {
            console.log(">>> initial callback");
            APP.views.details.renderItem(APP.model.details.storage, $('.js--details'));
            console.log("<<< initial callback");
        });
    };

//    testQuery("BK-18305");

    testQuery("SK-A-1718");

});
