'use strict';

var APP = APP || {};

$(window).scroll(function () {
    if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
        $('main').trigger('window-scrolled');
    }
});

$(function() {

    APP.query = "Pieter de Hooch";

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $('main').on('window-scrolled', function() {      /* Window has scrolled */
        console.log("$('main').on('window-scrolled')");
        APP.model.getDataFromApiForCollection(APP.query, function() {
            console.log(">>> scrolling callback");
            APP.views.renderCollection(APP.model.storage, $('.js--list'), true);
            console.log("<<< scrolling callback");
        });
    });

//    var testQuery = function(id) {
//        APP.model.getDataFromApiForArtist(id, function() {
//            console.log(">>> initial callback");
////            APP.views.renderArtist(APP.model.storage, $('.js--list'));
//            console.log("<<< initial callback");
//        });
//    };

    var testQuery = function(query) {
        APP.model.getDataFromApiForCollection(query, function() {
            var objectNumber = APP.model.storage[0].artObjects[0].objectNumber;
            console.log(">>> initial callback");
            APP.model.getDataFromApiForArtistDetails(objectNumber, function() {
                console.log(">>> artist callback");
                APP.views.renderArtist(APP.model.storage[1], $('.js--artist'));
                console.log("<<< artist callback");
                APP.views.renderCollection(APP.model.storage[0], $('.js--list'), false);
                console.log("<<< initial callback");
            });
        });
    };

//    testQuery("Hendrick Avercamp");
//    testQuery("rembrandt");
//    testQuery("panel");
    //Pieter de Hooch
    testQuery(APP.query);

});
