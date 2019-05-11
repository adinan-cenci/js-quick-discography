const SearchRelease = require('../src/SearchRelease.js');
var release;

//----------------------

release = new SearchRelease();

// Now, let's say we want to find the Metallica's...
release.artist('Metallica')

// ...albuns...
release.primaryType('album')

// ...that contain within it oficial releases...
release.status('official')

// ...and no live performances, compilations or demos...
release.secondarytype(['-live', '-compilation', '-demo'])

//----------------------

release.search()
.then(results => console.log(results))
.catch(er => console.log(er));
