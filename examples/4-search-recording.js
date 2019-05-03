const SearchRecording = require('../src/SearchRecording.js');

s = new SearchRecording();
s.rgid('79bd3bdb-6362-4514-81b3-8ceb5c330f01');


s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
