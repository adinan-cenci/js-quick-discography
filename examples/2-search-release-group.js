var SearchReleaseGroup = require('../src/SearchReleaseGroup.js');

s = new SearchReleaseGroup();
s.artist('blind guardian').complete();

s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
