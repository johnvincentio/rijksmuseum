'use strict';

/*jshint multistr: true */

var APP = APP || {};

/*
build 2 views
https://www.rijksmuseum.nl/en/search?v=list&f=1&p=1&ps=10&st=OBJECTS&ii=6
notice two formats
*/

APP.views = {
    getTemplate: function() {
        return '\
    <div class="row clearfix" data-item-id="{{1}}">\
        <div>\
            <figure class="box">\
                <img class="col-2" src="{{5}}" alt="{{6}}">\
                <figcaption class="col-8">\
                    <h2>{{2}}</h2>\
                    <span>Artist: <p>{{3}}</p></span>\
                    <span>id: <p>{{4}}</p></span>\
                </figcaption>\
                <div class="col-2"></div>\
            </figure>\
        </div>\
        <div class=".js--event-availability"></div>\
    </div>';
    },
/*
.replace('{{5}}', item.webImage.url)
headerImage
item.headerImage.url is used on rijkstudio home page
it is half-height image
*/
    buildCollectionItem: function(idx, item) {
        var template = this.getTemplate();
        return template.replace('{{1}}', item.objectNumber)
            .replace('{{2}}', item.longTitle)
            .replace('{{3}}', item.principalOrFirstMaker)
            .replace('{{4}}', item.objectNumber)
            .replace('{{5}}', item.webImage.url)
            .replace('{{6}}', item.title);
//            .replace('{{7}}', item.dating.yearEarly)
//            .replace('{{8}}', item.dating.yearLate);
    },

    renderCollection: function(data, element, scrolling) {
        console.log(">>> renderCollection");
        var html = '';
        var that = this;
        if (data.artObjects && data.artObjects.length > 0) {
            data.artObjects.forEach(function(item, idx) {
                html += that.buildCollectionItem(idx, item);
            });
            html += "</div>";
        }
        if (scrolling) {
            element.append(html);
        }
        else {
            element.html(html);
        }
        console.log("<<< renderCollection");
    }
};
