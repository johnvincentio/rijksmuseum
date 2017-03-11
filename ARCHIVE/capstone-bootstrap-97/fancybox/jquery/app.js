'use strict';

/*jshint multistr: true */

var APP = APP || {};

var template='\
<a class="fancybox" rel="gallery1" href="http://farm2.staticflickr.com/1617/24108587812_6c9825d0da_b.jpg" title="Morning Godafoss (Brads5)">\
    <img src="http://farm2.staticflickr.com/1617/24108587812_6c9825d0da_m.jpg" alt="" />\
</a>\
<a class="fancybox" rel="gallery1" href="http://farm4.staticflickr.com/3691/10185053775_701272da37_b.jpg" title="Vertical - Special Edition! (cedarsphoto)">\
    <img src="http://farm4.staticflickr.com/3691/10185053775_701272da37_m.jpg" alt="" />\
</a>\
<a class="fancybox" rel="gallery1" href="http://farm1.staticflickr.com/574/22407305427_69cc6e845f_b.jpg" title="Racing against the Protons (tom.leuzi)">\
    <img src="http://farm1.staticflickr.com/574/22407305427_69cc6e845f_m.jpg" alt="" />\
</a>\
<a class="fancybox" rel="gallery1" href="http://farm1.staticflickr.com/291/18653638823_a86b58523c_b.jpg" title="Lupines (Kiddi Einars)">\
    <img src="http://farm1.staticflickr.com/291/18653638823_a86b58523c_m.jpg" alt="" />\
</a>';

$(function() {
    $('.js--images').html(template);
});

