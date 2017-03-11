'use strict';

var artists = ["Abraham Roentgen","Abraham van der Hart","Adam van Vianen (I)","Adriaan de Lelie","Adriaen Coorte","Adriaen Pietersz. van de Venne","Adriaen Thomasz. Key","Adriaen de Vriend, Adriaen Davidsen, Cornelis Moesman","Adriaen van Wesel","Aelbert Cuyp","Alger Mensma","André-Charles Boulle","Artus Quellinus (I)","Bartholomeus van der Helst","Cornelis Cornelisz. van Haarlem","Cornelis Troost","De Metaale Pot","Dirck Hals","Floris Claesz. van Dijck","Francisco de Goya","Frans Hals","Frans Jansz Post","Gabriël Metsu","Geertgen tot Sint Jans","George Hendrik Breitner","Gerard ter Borch (II)","Gerard van Honthorst","Gerrit Adriaensz. Berckheyde","Gerrit Hutte","Gerrit Schouten","Hans Bollongier","Hendrick Avercamp","Herman Doomer","Jacob Cornelisz van Oostsanen","Jacob Isaacksz. van Ruisdael","Jan Adolf Hillebrand","Jan Asselijn","Jan Baptist Xavery","Jan Both","Jan Havicksz. Steen","Jan Willem Pieneman","Jan van Scorel","Jean Baptiste Vanmour","Joachim Bueckelaer","Johan Gregor van der Schardt","Johannes Cornelisz. Verspronck","Johannes Vermeer","Jozef Israëls","Lucas van Leyden","Master of Alkmaar","Meester van Joachim en Anna","Meissener Porzellan Manufaktur","Melchior d' Hondecoeter","Paul Joseph Constantin Gabriël","Piero di Cosimo","Pieter Jansz. Saenredam","Pieter de Hooch","Rembrandt Harmensz. van Rijn","Renier van Thienen","Rombout Verhulst","Vincent van Gogh","Wenzel Jamnitzer","Willem Claesz. Heda","Willem van de Velde (I)","anonymous","Étienne-Maurice Falconet"];

artists.sort(function(a, b) {
    return a.localeCompare(b);
});

artists.forEach(function(item) {
    console.log(item);
});


/*
artists.sort(function(a, b) {
    var c = a.toLowerCase();
    var d = b.toLowerCase();
    if (c < d) return -1;
    if (c > d) return 1;
    return 0;
});
*/
