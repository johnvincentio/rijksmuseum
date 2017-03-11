
'use strict';

var APP = APP || {};

APP.keys = {
    COLLECTION_URL: "https://www.rijksmuseum.nl/api/en/collection",
    COLLECTION_ITEM_URL: "https://www.rijksmuseum.nl/api/en/collection",
    API_KEY: "3yLwaBE9"
};

/*
https://www.rijksmuseum.nl/api/en/collection?key=3yLwaBE9&format=json
*/

APP.model = {
    page: 1,
    storage : [],

    getOptions: function() {
        var options = {};
        options.key = APP.keys.API_KEY;
        options.format = "json";
        options.p = this.page;
//        options.s = "relevance";
        return options;
    },
    getDataFromApi : function(search_url, options, callback) {
        console.log(">>> getDataFromApi; options"+JSON.stringify(options));
        var that = this;
        var request = $.ajax({
            url: search_url,
            data: options,
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            that.page++;
            callback();
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },

    getDataFromApiForCollection: function(callback) {
        console.log(">>> getDataFromApiForCollection");
        var options = this.getOptions();
        this.getDataFromApi(APP.keys.COLLECTION_URL, options, callback);
        console.log("<<< getDataFromApiForCollection");
    }
};
