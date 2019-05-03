const SearchRelease = require('../src/SearchRelease.js');

s = new SearchRelease();
s.artist('blind guardian');

s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
