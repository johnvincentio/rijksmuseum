'use strict';

/*jshint multistr: true */

var APP = APP || {};

APP.views = {
    getTemplate: function() {
        return '\
    <div class="row" data-item-id={{1}}>\
        <div>\
            <h2>{{2}}</h2>\
            <span>Description: <p>{{3}}</p></span>\
            <span>Tour time: <p>{{7}}</></span>\
            <a href="{{4}}" target="_blank">More Details</a>\
            <a href="{{6}}">Reservations and Ticketing</a>\
        </div>\
        <div class=".js--event-availability"></div>\
    </div>';
    },
    buildEvent: function(idx, item) {
        var template = this.getTemplate();
        return template.replace('{{1}}', idx)
            .replace('{{2}}', item.pageRef.title)
            .replace('{{3}}', item.exposition.description)
            .replace('{{4}}', item.pageRef.url)
            .replace('{{6}}', item.links.web)
            .replace('{{7}}', item.period.text);
    },

    renderEvents: function(data, element) {
        console.log(">>> renderEvents");
        var html = '';
        var that = this;
        if (data.options && data.options.length > 0) {
            data.options.forEach(function(item, idx) {
                html += that.buildEvent(idx, item);
            });
            html += "</div>";
        }
        element.html(html);
        console.log("<<< renderEvents");
    }
};
