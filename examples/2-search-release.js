var SearchRelease = require('../src/SearchRelease.js').SearchRelease;

s = new SearchRelease();
s.artist('blind guardian');

s.search().then(function(results) 
{
    console.log(results);
})