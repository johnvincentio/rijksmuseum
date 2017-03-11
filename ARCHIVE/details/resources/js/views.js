'use strict';

/*jshint multistr: true */

var APP = APP || {};

APP.views = {
    handleUrlArray: function(title, array) {
        if (array && array.length > 0) {
            var html = '<div>'+title+'<ul>';
            array.forEach(function(item) {
                html += '<li><a href="'+item.url+'">' + item.name + '</a></li>';
            });
            html += "</ul></div>";
            return html;
        }
        return "";
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
    getTemplate: function() {
        return '\<div class="row clearfix" data-item-id="{{1}}">\
        <img class="col-12" src="{{2}}" alt="{{3}}">\
    <div>\
    <div class="row">\
        <p>longTitle: {{4}}</p>\
        <p>subtitle: {{5}}</p>\
        <p>physicalMedium: {{9}}</p>\
        <p>label.description: {{10}}</p>\
        <p>plaqueDescription: {{12}}</p>\
    </div>\
{{6}}\
{{7}}\
{{8}}\
{{11}}\
    ';
    },
    buildCollectionItem: function(item, page) {
        var template = this.getTemplate();
        return template.replace('{{1}}', item.objectNumber)
            .replace('{{2}}', item.webImage.url)
            .replace('{{3}}', item.title)
            .replace('{{4}}', item.longTitle)
            .replace('{{5}}', item.subTitle)
            .replace('{{6}}', this.handleArray('Materials', item.materials))
            .replace('{{7}}', this.handleArray('Techniques', item.techniques))
            .replace('{{8}}', this.handleArray('physicalProperties', item.physicalProperties))
            .replace('{{9}}', item.physicalMedium)
            .replace('{{10}}', item.label.description)
            .replace('{{11}}', this.handleUrlArray('similarPages', page.similarPages))
            .replace('{{12}}', page.plaqueDescription)
        ;
    },
    renderItem: function(data, element) {
        console.log(">>> renderItem");
        var html = this.buildCollectionItem(data.artObject, data.artObjectPage);
        element.html(html);
        console.log("<<< renderItem");
    }
};
