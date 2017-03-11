
'use strict';

var APP = APP || {};

APP.keys = {
    COLLECTION_URL: "https://www.rijksmuseum.nl/api/en/collection",
    COLLECTION_ITEM_URL: "https://www.rijksmuseum.nl/api/en/collection/",
    API_KEY: "3yLwaBE9"
};

APP.model = {
    page: 1,
    storage : [],

    getOptions: function() {
        var options = {};
//        options.maker = "hooch";
        options.key = APP.keys.API_KEY;
        options.format = "json";
        options.p = this.page;
        return options;
    },
    getDataFromApi : function(idx, search_url, options, callback) {
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
            that.storage[idx] = data;
            that.page++;                // TODO; only use this for scrolling.
            if (callback) {
                callback();
            }
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },

    getDataFromApiForCollection: function(id, callback) {
        console.log(">>> getDataFromApiForCollection; id "+id);
        var options = this.getOptions();
// this works
//        options.principalMaker = "Hendrick Avercamp";
        options.principalMaker = id;
//        options.q = id;
//        options.s = "artist";

//        options.type = "painting";
//        options.material = "panel";
        this.getDataFromApi(0, APP.keys.COLLECTION_URL, options, callback);
        console.log("<<< getDataFromApiForCollection");
    },

    getDataFromApiForArtistDetails: function(objectNumber, callback) {
        console.log(">>> getDataFromApiForArtistDetails");
        var options = this.getOptions();
//        options.principalMaker = id;
//        options.q = id;
//        options.s = "artist";

//        options.type = "painting";
//        options.material = "panel";
        this.getDataFromApi(1, APP.keys.COLLECTION_ITEM_URL + objectNumber, options, callback);
        console.log("<<< getDataFromApiForArtistDetails");
    }
};

/*
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
    */
