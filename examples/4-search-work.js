var SearchWork = require('../src/SearchWork.js');

s = new SearchWork();
s.work('Frozen');

s.search().then(function(results) 
{
    console.log(results);
})