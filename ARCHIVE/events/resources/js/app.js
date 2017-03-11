'use strict';

var APP = APP || {};

$(function() {

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $('main').on('model-changed', function() {      /* Model has changed */
        console.log("$('main').on('model-changed')");
        $('main').trigger('render-events');
    });

    $('main').on('render-events', function() {      /* Render content */
        console.log("$('main').on('render-events')");
        APP.views.renderEvents(APP.model.storage, $('.js--events-list'));
    });
/*
            $('main').trigger('model-changed');
*/
    var callback = function() {
        console.log(">>> callback");
        $('main').trigger('model-changed');
        console.log("<<< callback");
    };

    var testQuery = function() {
        APP.model.getDataFromApiForEvents(APP.utils.formatDate(new Date()), callback);
    };

    testQuery();

});
