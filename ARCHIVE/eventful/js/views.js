'use strict';

/*jshint multistr: true */

var APP = APP || {};

APP.views = {
    renderSearchContent: function(data, element) {
        console.log(">>> renderSearchContent");
        console.log("data :"+data+":");
        var html = '';
        if (data) {
            html += JSON.stringify(data);
        }
        element.html(html);
        console.log("<<< renderSearchContent");
    }
};
