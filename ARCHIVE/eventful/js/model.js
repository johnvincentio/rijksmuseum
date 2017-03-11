'use strict';

/*
see:
http://bettiolo.github.io/oauth-reference-page/
provides oauth parameters.

application key is wgjsPzmgxBxTMJkP
oAuth Consumer Key: 4cb53e3b32553b177ed8
oAuth Consumer Secret: 78d6ec578720dc500555

http://api.eventful.com/json/events/search?q=music&app_key=wgjsPzmgxBxTMJkP

I believe this might likely be that Chrome does not support localhost to go through the Access-Control-Allow-Origin -- see Chrome issue

To have Chrome send Access-Control-Allow-Origin in the header, just alias your localhost in your /etc/hosts file to some other domain, like:

127.0.0.1   localhost yourdomain.com

*/

var APP = APP || {};

APP.keys = {
    SEARCH_EVENTS_URL: 'http://api.eventful.com/json/events/search',
    APP_KEY: 'wgjsPzmgxBxTMJkP',
    REQUEST_TOKEN_URL: 'http://eventful.com/oauth/request_token',
    CONSUMER_KEY: '4cb53e3b32553b177ed8',
    CONSUMER_SECRET: '78d6ec578720dc500555'
};

APP.model = {
    storage : [],

    getOptions: function() {
        var options = {};
        options.app_key = APP.keys.APP_KEY;
        return options;
    },
    getDataFromApi : function(options) {
        console.log(">>> getDataFromApi; options"+JSON.stringify(options));
        var that = this;
        var request = $.ajax({
            url: APP.keys.SEARCH_EVENTS_URL,
            data: options,
            dataType: 'jsonp',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            that.storage = data;
            $('main').trigger('model-changed');
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getDataFromApi");
    },
/*
Get by Search term
*/
    getDataFromApiForSearch : function(searchTerm) {
        console.log(">>> getDataFromApiForSearch");
        var options = this.getOptions();
        options.q = searchTerm;
        this.getDataFromApi(options);
        console.log("<<< getDataFromApiForSearch");
    },

/*
play with oAuth

POST /oauth/request_token?oauth_callback=http%3A%2F%2Fexample.com%2Fcallback&oauth_consumer_key=bafe29a8e561b3d15803&oauth_nonce=1cdb7f498ba9811513f2&oauth_signature=8EfteAvDBuE8MTVBABg2WhXnzY0%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1336765460&oauth_version=1.0 HTTP/1.1

POST /oauth/request_token?oauth_callback=http%3A%2F%2Fexample.com%2Fcallback&oauth_consumer_key=bafe29a8e561b3d15803&oauth_nonce=1cdb7f498ba9811513f2&oauth_signature=8EfteAvDBuE8MTVBABg2WhXnzY0%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1336765460&oauth_version=1.0 HTTP/1.1


//        options.app_key = APP.keys.APP_KEY;
//        options.oauth_signature = "8jF3MrrOJjQhwjydrDShQCivfQI%3D";

*/
    test1: function() {
        console.log(">>> test1");
        var options = {};
        options.app_key = APP.keys.APP_KEY;
        options.oauth_callback = "http://www.cloud-developer.net";
        options.oauth_consumer_key = APP.keys.CONSUMER_KEY;
        options.oauth_token = '';
        options.oauth_token_secret = '';
        options.oauth_nonce="646586472";
        options.oauth_signature = "8jF3MrrOJjQhwjydrDShQCivf";
        options.oauth_signature_method = "HMAC-SHA1";
        options.oauth_timestamp = "1479689420";
        options.oauth_version = "1.0";

        var jv = 'app_key=' + APP.keys.APP_KEY +
            '&oauth_consumer_key=' + APP.keys.CONSUMER_KEY +
            '&oauth_callback=http://eventful.com' +
//            '&oauth_token='+'' +
//            '&oauth_token_secret=' + ' ' +
            '&oauth_nonce=836279144' +
            '&oauth_signature=lMT2M%2FhFK%2B%2Fpivajp%2Fq9DBr3RYQ%3D' +
            '&oauth_signature_method=HMAC-SHA1' +
            '&oauth_timestamp=1479707217' +
            '&oauth_version=1.0';

//        jv = 'oauth_consumer_key=4cb53e3b32553b177ed8&oauth_nonce=603221639&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1479704664&oauth_version=1.0&oauth_signature=qUbZSC8SkQwYKKhymz4EoHCbXXs=&oauth_callback=http://example.com/callback';

//        var that = this;
        var request = $.ajax({
            url: APP.keys.REQUEST_TOKEN_URL,
//            contentType: 'application/json',
            contentType: 'application/x-www-form-urlencoded',
//            contentType: 'text',
            crossDomain: true,
            crossOrigin: true,
            cache: false,
            data: jv,
//            dataType: 'json',
//            transformRequest: function(obj) {
//                var str = [];
//                for(var p in obj)
//                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                return str.join("&");
//            },
//            processData: false,
            type: "POST"
//headers: {
//'X-Requested-With': 'XMLHttpRequest'
//},
//            xhrFields: {
//                withCredentials: true
//            }
        });
        request.done(function(data) {
            console.log("test1 Data");
//            that.storage = data;
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });

        console.log("<<< test1");
    }
};
