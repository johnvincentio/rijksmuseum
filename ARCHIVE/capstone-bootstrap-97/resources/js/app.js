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

/*
switch back here: renderItem , renderItemTest
*/
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

    $('.js--main-image').on('click', function() {
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

    $('.js--details').on('click', 'img', function(event) {
        console.log("click; .js--details img");
        event.preventDefault();
        var ahref = $(this).parent();
        ahref.fancybox({
            type: 'image',      // as url is not obviously an image
            openEffect	: 'none',
            closeEffect	: 'none'
        });
        ahref.click();
    });

//    $(".fancybox").fancybox({
//        type: 'image',
//        openEffect	: 'none',
//        closeEffect	: 'none'
//    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $('main').trigger('init');

});

/*
    $('.js--details').on('click', 'img', function(event) {
        console.log("click; .js--details img");
        event.preventDefault();
        var jv = $('.js--details .fancybox');
        console.log("jv "+jv);
        jv.fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });
        jv.click();
    });
*/

/*

    $('.jv-js--details').on('click', '.js--select-detailed-image', function(event) {
        console.log("click; .js--details .js--select-detailed-image");
        event.preventDefault();
//        $(".fancybox").fancybox({
//            openEffect	: 'none',
//            closeEffect	: 'none'
//        });
    });
*/
/*
    $('.jv-js--details').on('click', '.js--select-detailed-image img', function(event) {
        console.log("click; .js--details .js--select-detailed-image img");
        event.preventDefault();
        var jv = $('.js--details .fancybox');
        console.log("jv "+jv);
        jv.fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });
//        jv.click();
    });
*/

