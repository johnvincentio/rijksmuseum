'use strict';

var APP = APP || {};

$(function() {

    var $nav_home = $('.js--nav-home');

/* ----------------------------------- */
/* Window events */
/* ----------------------------------- */

    $(window).scroll(function () {
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
            console.log("window.scroll");
            if ($('.js--collection').is(':visible')) {
                $('main').trigger('init');
            }
        }
    });

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $('main').on('init', function() {
        console.log("$('main').on('init')");
        APP.model.collection.getDataFromApiForCollection(function() {
            console.log(">>> initial callback");
            APP.views.collection.renderCollection(APP.model.collection.storage, $('.js--collection'), true);
            console.log("<<< initial callback");
        });
    });

    $('main').on('item-details', function(event, id) {
        console.log("$('main').on('item-details')");
        APP.model.details.getDataFromApiForItem(id, function() {
            console.log(">>> initial callback");
            APP.views.details.renderItem(APP.model.details.storage, $('.js--details'));
            $('.js--main-image').hide();
            $('.js--collection').hide();
            $('.js--details').show();
            console.log("<<< initial callback");
        });
    });

/* ----------------------------------- */
/* Navigation events */
/* ----------------------------------- */

    $('.js--main-image img').on('click', function() {
        var id = $(this).attr('data-item-id');
        console.log("details for id: "+id);
        $('main').trigger('item-details', id);
    });

    $('.js--nav-home').on('click', function() {
        console.log(".js--nav-home");
        $('.js--main-image').show();
        $('.js--details').hide();
        $('.js--collection').show();
        $('.js--events').hide();
    });

    $('.js--nav-events').on('click', function() {
        console.log(".js--nav-events");
        if ($('.js--events').children().length < 1) {
            console.log("empty events");
            APP.model.events.getDataFromApiForEvents(APP.utils.formatDate(new Date()), function() {
                APP.views.events.renderEvents(APP.model.events.storage, $('.js--events'));
                $('.js--main-image').show();
                $('.js--details').hide();
                $('.js--collection').hide();
                $('.js--events').show();
            });
        }
        else {
            console.log("NOT empty events");
            $('.js--main-image').show();
            $('.js--details').hide();
            $('.js--collection').hide();
            $('.js--events').show();
        }

    });
    $('.js--nav-aboutus').on('click', function() {
        console.log(".js--nav-aboutus");
    });

/* ----------------------------------- */
/* Collection item details             */
/* ----------------------------------- */

    $('.js--collection').on('click', '.js--select-item', function() {
        console.log("click: .js--collection .js--select-item");
        var id = $(this).attr('data-item-id');
        console.log("details for id: "+id);
        $('main').trigger('item-details', id);
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $('main').trigger('init');

});

/*
How to pass parameters in a custom event:

$('main').trigger('click-image-youtube', imageId);
$('main').on('click-image-youtube', function(event, imageId) {});
*/




/*
$(function() {

    $('main').on('model-changed', function() {
        console.log("$('main').on('model-changed')");
        $('main').trigger('render-events');
    });

    $('main').on('render-events', function() {
        console.log("$('main').on('render-events')");
        APP.views.renderEvents(APP.model.storage, $('.js--events-list'));
    });

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

*/
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
