const SearchArtist = require('../src/SearchArtist.js');
var s;

//----------------------

s = new SearchArtist();
s.name('Veonity');

//----------------------

s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
