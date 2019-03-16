var SearchArtist = require('../src/SearchArtist.js').SearchArtist;

s = new SearchArtist();
s.name('blind guardian');


s.search().then(function(results) 
{
    console.log(results);
})