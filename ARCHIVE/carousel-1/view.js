'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.carousel = {
    getTemplate: function() {
        return '\
  <br>\
  <div id="myCarousel" class="carousel slide" data-ride="carousel">\
    <ol class="carousel-indicators">\
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>\
      <li data-target="#myCarousel" data-slide-to="1"></li>\
      <li data-target="#myCarousel" data-slide-to="2"></li>\
      <li data-target="#myCarousel" data-slide-to="3"></li>\
    </ol>\
\
    <!-- Wrapper for slides -->\
    <div class="carousel-inner" role="listbox">\
\
      <div class="item active">\
        <img src="images/img_chania.jpg" alt="Chania" width="460" height="345">\
        <div class="carousel-caption">\
          <h3>Chania</h3>\
          <p>The atmosphere in Chania has a touch of Florence and Venice.</p>\
        </div>\
      </div>\
\
      <div class="item">\
        <img src="images/img_chania2.jpg" alt="Chania" width="460" height="345">\
        <div class="carousel-caption">\
          <h3>Chania</h3>\
          <p>The atmosphere in Chania has a touch of Florence and Venice.</p>\
        </div>\
      </div>\
\
      <div class="item">\
        <img src="images/img_flower.jpg" alt="Flower" width="460" height="345">\
        <div class="carousel-caption">\
          <h3>Flowers</h3>\
          <p>Beatiful flowers in Kolymbari, Crete.</p>\
        </div>\
      </div>\
\
      <div class="item">\
        <img src="images/img_flower2.jpg" alt="Flower" width="460" height="345">\
        <div class="carousel-caption">\
          <h3>Flowers</h3>\
          <p>Beatiful flowers in Kolymbari, Crete.</p>\
        </div>\
      </div>\
\
    </div>\
\
    <!-- Left and right controls -->\
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">\
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
      <span class="sr-only">Previous</span>\
    </a>\
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">\
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
      <span class="sr-only">Next</span>\
    </a>\
  </div>';
    },
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

    render: function(data, element) {
        console.log(">>> render");
        var html = '';
//        var that = this;
//        if (data.artObjects && data.artObjects.length > 0) {
//            data.artObjects.forEach(function(item, idx) {
//                html += that.buildCollectionItem(idx, item);
//            });
//            html += "</div>";
//        }
        html = this.getTemplate();
        element.html(html);
        console.log("<<< render");
    }
};
