'use strict';

/*jshint multistr: true */

var APP = APP || {};

APP.views = {
    getTemplate: function() {
        return '\
    <div class="row clearfix" data-item-id={{1}}>\
        <div>\
            <figure class="box">\
                <img class="col-2" src="{{5}}" alt="{{6}}">\
                <figcaption class="col-8">\
                    <h2>{{2}}</h2>\
                    <span>Artist: <p>{{3}}</p></span>\
                    <span>id: <p>{{4}}</></span>\
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
        return template.replace('{{1}}', idx)
            .replace('{{2}}', item.title)
            .replace('{{3}}', item.principalOrFirstMaker)
            .replace('{{4}}', item.objectNumber)
            .replace('{{5}}', item.webImage && item.webImage.url ? item.webImage.url : "")
            .replace('{{6}}', item.title);
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
    },

    handleArray: function(title, array) {
        if (array && array.length > 0) {
            var html = '<div>'+title+'<ul>';
            array.forEach(function(item) {
                html += '<li><a href="">' + item + '</a></li>';
            });
            html += "</ul></div>";
            return html;
        }
        return "";
    },
    getArtistTemplate: function() {
        return '\
    <div class="row clearfix">\
        <div>Add Wikipedia link here....\
            <p>name: {{1}}</p>\
<p>placeOfBirth: {{2}}</p>\
<p>dateOfBirth: {{3}}</p>\
<p>dateOfDeath: {{4}}</p>\
<p>placeOfDeath: {{5}}</p>\
<p>nationality: {{6}}</p>\
<p>biography: {{7}}</p>\
{{8}}\
        </div>\
    </div>';
    },
    buildArtistItem: function(item) {
        var template = this.getArtistTemplate();
        return template.replace('{{1}}', item.name)
            .replace('{{2}}', item.placeOfBirth)
            .replace('{{3}}', item.dateOfBirth)
            .replace('{{4}}', item.dateOfDeath)
            .replace('{{5}}', item.placeOfDeath)
            .replace('{{6}}', item.nationality)
            .replace('{{7}}', item.biography)
            .replace('{{8}}', this.handleArray('occupation', item.occupation))
        ;
    },
    renderArtist: function(data, element) {
        console.log(">>> renderArtist");
        var html = this.buildArtistItem(data.artObject.principalMakers[0]);
        element.html(html);
        console.log("<<< renderArtist");
    }
};
