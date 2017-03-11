'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.details = {
    getTemplate: function() {
        return '\
    <div class="outer-box" data-item-id="{{1}}">\
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\
            <img class="img-responsive" src="{{2}}" alt="{{3}}">\
        </div>\
    </div>\
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\
        <p>longTitle: {{4}}</p>\
        <p>subtitle: {{5}}</p>\
        <p>physicalMedium: {{9}}</p>\
        <p>label.description: {{10}}</p>\
        <p>plaqueDescription: {{12}}</p>\
    </div>\
    ';
/*
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-9">\
        <p>longTitle: {{4}}</p>\
        <p>subtitle: {{5}}</p>\
        <p>physicalMedium: {{9}}</p>\
        <p>label.description: {{10}}</p>\
        <p>plaqueDescription: {{12}}</p>\
    </div>\
*/

    },
    buildCollectionItem: function(item, page) {
        var template = this.getTemplate();
        var maker = item.principalMakers[0];
        return template.replace('{{1}}', item.objectNumber)
            .replace('{{2}}', item.webImage.url)
            .replace('{{3}}', item.title)
            .replace('{{4}}', item.longTitle)
            .replace('{{5}}', item.subTitle)
            .replace('{{6}}', APP.utils.handleArray('Materials', item.materials))
            .replace('{{7}}', APP.utils.handleArray('Techniques', item.techniques))
            .replace('{{8}}', APP.utils.handleArray('physicalProperties', item.physicalProperties))
            .replace('{{9}}', item.physicalMedium)
            .replace('{{10}}', item.label.description)
            .replace('{{11}}', APP.utils.handleUrlArray('similarPages', page.similarPages))
            .replace('{{12}}', page.plaqueDescription)
            .replace('{{21}}', maker.name)
            .replace('{{22}}', maker.placeOfBirth)
            .replace('{{23}}', maker.dateOfBirth)
            .replace('{{24}}', maker.dateOfDeath)
            .replace('{{25}}', maker.placeOfDeath)
            .replace('{{26}}', maker.nationality)
            .replace('{{27}}', maker.biography)
            .replace('{{28}}', APP.utils.handleArray('occupation', maker.occupation))
        ;
    },
    renderItem: function(data, element) {
        console.log(">>> APP.views.details.renderItem");
        var html = this.buildCollectionItem(data.artObject, data.artObjectPage);
        element.html(html);
        console.log("<<< APP.views.details.renderItem");
    }
};

/*
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
*/
/*
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
    <div class="row clearfix">\
        <div>Add Wikipedia link here....\
            <p>name: {{21}}</p>\
<p>placeOfBirth: {{22}}</p>\
<p>dateOfBirth: {{23}}</p>\
<p>dateOfDeath: {{24}}</p>\
<p>placeOfDeath: {{25}}</p>\
<p>nationality: {{26}}</p>\
<p>biography: {{27}}</p>\
{{28}}\
        </div>\
    </div>\
*/
