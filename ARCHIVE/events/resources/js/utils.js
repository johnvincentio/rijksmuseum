'use strict';

/*jshint multistr: true */

var APP = APP || {};

APP.utils = {

    formatDate: function(date) {
        var d = new Date(date);
        var month = '' + (date.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }
};
