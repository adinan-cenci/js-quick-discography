var SearchArtist = require('../src/SearchArtist.js');

s = new SearchArtist();

s.tag(['metal', 'german']).begin({min: 1980, max: 2000})

console.log(s.getRequestUrl());
