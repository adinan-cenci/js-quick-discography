const SearchReleaseGroup = require('../src/SearchReleaseGroup.js');
var releaseGroups;

//----------------------

releaseGroups = new SearchReleaseGroup();

// Now, let's say we want to find the Metallica's...
releaseGroups.artist('Metallica')

// ...albuns...
releaseGroups.primaryType('album')

// ...that contain within it oficial releases...
releaseGroups.status('official')

// ...and no live performances, compilations or demos...
releaseGroups.secondarytype(['-live', '-compilation', '-demo'])

//----------------------

releaseGroups.search()
.then(results => console.log(results))
.catch(er => console.log(er));
