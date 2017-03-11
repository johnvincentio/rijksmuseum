'use strict';

var APP = APP || {};

$(window).scroll(function () {
    if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
//        alert("End Of The Page");
        $('main').trigger('window-scrolled');
    }
});

$(function() {

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

//    $('main').on('model-changed', function() {      /* Model has changed */
//        console.log("$('main').on('model-changed')");
//        $('main').trigger('render-collection');
//    });

    $('main').on('window-scrolled', function() {      /* Window has scrolled */
        console.log("$('main').on('window-scrolled')");
        APP.model.getDataFromApiForCollection(function() {
            console.log(">>> scrolling callback");
            APP.views.renderCollection(APP.model.storage, $('.js--list'), true);
            console.log("<<< scrolling callback");
        });
    });

    var testQuery = function() {
        APP.model.getDataFromApiForCollection(function() {
            console.log(">>> initial callback");
            APP.views.renderCollection(APP.model.storage, $('.js--list'), false);
            console.log("<<< initial callback");
        });
    };
//    var testQuery = function() {
//        APP.model.getDataFromApiForCollection(callback);
//    };
//    var test2 = function() {
//        APP.model.getDataFromApiForCollectionItem("BK-18305", callback);
//    };
/*
objectNumber
:
"BK-18305"
*/

    testQuery();
//    test2();

});
