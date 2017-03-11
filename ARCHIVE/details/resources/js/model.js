
'use strict';

var APP = APP || {};

APP.keys = {
    COLLECTION_URL: "https://www.rijksmuseum.nl/api/en/collection",
    COLLECTION_ITEM_URL: "https://www.rijksmuseum.nl/api/en/collection/",
    API_KEY: "3yLwaBE9"
};

/*
https://www.rijksmuseum.nl/api/en/collection?key=3yLwaBE9&format=json
*/

APP.model = {
    storage : [],

    getOptions: function() {
        var options = {};
        options.key = APP.keys.API_KEY;
        options.format = "json";
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
            if (callback) callback();
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },

    getDataFromApiForItem: function(id, callback) {
        console.log(">>> getDataFromApiForItem");
        var options = this.getOptions();
        this.getDataFromApi(APP.keys.COLLECTION_ITEM_URL + id, options, callback);
        console.log("<<< getDataFromApiForItem");
    }
};
