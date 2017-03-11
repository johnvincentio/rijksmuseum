'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

/*
build 2 views
https://www.rijksmuseum.nl/en/search?v=list&f=1&p=1&ps=10&st=OBJECTS&ii=6
notice two formats
*/
/*
        var template = '<div class="col-4">\
        <figure class="box">\
            <a class="fancybox-media" href="{{6}}"></a>\
            <div class="tooltip"> \
                <img data-item-id="{{1}}" src="{{2}}" alt="{{3}}">\
                <span><p class="title">{{4}}</p><p class="description">{{5}}</p></span> \
            </div>\
            <div class="center">\
                <button class="more-button" title="Get more from this channel" type="button">More</button>\
            </div>\
        </figure>\
    </div>';
*/
APP.views.collection = {
    getTemplate: function() {
        return '\
    <div class="col-4">\
        <figure class="box js--select-item" data-item-id="{{1}}">\
            <img src="{{5}}" alt="{{6}}">\
            <figcaption class="caption">\
                <h2>{{2}}</h2>\
                <p>{{3}}</p>\
            </figcaption>\
        </figure>\
    </div>';
    },
/*
.replace('{{5}}', item.webImage.url)
headerImage
item.headerImage.url is used on rijkstudio home page
it is half-height image
*/
    buildItem: function(idx, item) {
        var template = this.getTemplate();
        return template.replace('{{1}}', item.objectNumber)
            .replace('{{2}}', item.title)
            .replace('{{3}}', item.principalOrFirstMaker)
            .replace('{{4}}', item.objectNumber)
            .replace('{{5}}', item.webImage.url)
            .replace('{{6}}', item.title);
//            .replace('{{7}}', item.dating.yearEarly)
//            .replace('{{8}}', item.dating.yearLate);
    },

    renderCollection: function(data, element, scrolling) {
        console.log(">>> APP.views.collection.renderCollection");
        var html = '';
        var that = this;
        if (data.artObjects && data.artObjects.length > 0) {
            data.artObjects.forEach(function(item, idx) {
                if (idx === 0) {
                    html = '<div class="row clearfix center">';
                } else if (idx % 3 === 0) {
                    html += '</div><div class="row clearfix center">';
                }
                html += that.buildItem(idx, item);
            });
            html += "</div>";
        }
        if (scrolling) {
            element.append(html);
        }
        else {
            element.html(html);
        }
        console.log("<<< APP.views.collection.renderCollection");
    }
};
