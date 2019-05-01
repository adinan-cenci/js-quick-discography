var SearchArtist = require('../src/SearchArtist.js');

s = new SearchArtist();
s.name('blind guardian').complete();


s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
