var SearchWork = require('../src/SearchWork.js');

s = new SearchWork();
s.work('Frozen');

s.search()
.then(results => console.log(results))
.catch(er => console.log(er));
