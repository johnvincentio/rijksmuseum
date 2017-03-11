'use strict';

var APP = APP || {};

$(function() {

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $('main').on('model-changed', function() {      /* Model has changed */
        console.log("$('main').on('model-changed')");
        $('main').trigger('render-show-data');
    });

    $('main').on('render-show-data', function() {      /* Render content */
        console.log("$('main').on('render-show-data')");
        APP.views.renderSearchContent(APP.model.storage, $('.js--show-data'));
    });

    var testQuery = function(query) {
        console.log("--- testQuery");
        APP.model.getDataFromApiForSearch(query);
    };

    console.log("stage 1");
//    testQuery("lunch");

    APP.model.test1();

});
