const SearchRelease = require('../src/SearchRelease.js');
var releases;

//----------------------

releases = new SearchRelease();

// Now, let's say we want to find the Metallica's...
releases.artist('Metallica')

// ...albuns...
releases.primaryType('album')

// ...that contain within it oficial releases...
releases.status('official')

// ...and no live performances, compilations or demos...
releases.secondarytype(['-live', '-compilation', '-demo'])

//----------------------

releases.search()
.then(results => console.log(results))
.catch(er => console.log(er));
