const SearchReleaseGroup = require('../src/SearchReleaseGroup.js');
var releaseGroup;

//----------------------

releaseGroup = new SearchReleaseGroup();

// Now, let's say we want to find the Metallica's...
releaseGroup.artist('Metallica')

// ...albuns...
releaseGroup.primaryType('album')

// ...that contain within it oficial releases...
releaseGroup.status('official')

// ...and no live performances, compilations or demos...
releaseGroup.secondarytype(['-live', '-compilation', '-demo'])

//----------------------

releaseGroup.search()
.then(results => console.log(results))
.catch(er => console.log(er));
