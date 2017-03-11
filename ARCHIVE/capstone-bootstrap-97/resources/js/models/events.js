
'use strict';

var APP = APP || {};
APP.model = APP.model || {};

/*
curl -v -i https://www.rijksmuseum.nl/api/en/agenda/2016-11-21?key=$API_KEY&format=json
*/
/*
item.links.availability

https://www.rijksmuseum.nl/api/en/agenda/2016-11-21/exposition/f83894c9-6d13-4047-a759-9ba98138e417/availability/ea3c99c3-c68b-4670-a511-7f3574f71cd2
*/
/*
availability needs to be a link to the calendar
      "links": {
        "availability": "https://www.rijksmuseum.nl/api/en/agenda/2016-11-21/exposition/5ef1726e-f872-43f9-b707-c25c3bf0711c/availability/2023f0da-f01e-4701-bcd9-a5e2f1e2977e",
which will load this...
*/

APP.model.events = {
    storage : [],

    getOptions: function() {
        var options = {};
        options.key = APP.keys.API_KEY;
        options.format = "json";
        return options;
    },
    getDataFromApi : function(options, current_date, callback) {
        console.log(">>> APP.model.events.getDataFromApi; options"+JSON.stringify(options));
        var that = this;
        var request = $.ajax({
            url: APP.keys.RIJKSMUSEUM_URL + '/' + APP.keys.EVENTS_URL + '/' + current_date,
            data: options,
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            callback();
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< APP.model.events.getDataFromApi");
    },

    getDataFromApiForEvents: function(current_date, callback) {
        console.log(">>> APP.model.events.getDataFromApiForEvents; "+current_date);
        var options = this.getOptions();
        this.getDataFromApi(options, current_date, callback);
        console.log("<<< APP.model.events.getDataFromApiForEvents");
    }
};
