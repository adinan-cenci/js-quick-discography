const SearchArtist = require('../src/SearchArtist.js');
var artists;

//----------------------

artists = new SearchArtist();

// Now, let's say we want to find Power Metal...
artists.tag('Power metal')

// ...bands...
artists.type('Group')

// ...in Sweden, Norway, Finland and Germany...
artists.country(['SE', 'NO', 'FI', 'DE'], 'OR')

// ...founded between 1970 and 1990
artists.begin({min: 1970, max: 1990})

//----------------------

artists.search()
.then(results => console.log(results))
.catch(er => console.log(er));
