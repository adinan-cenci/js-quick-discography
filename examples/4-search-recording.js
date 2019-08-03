const SearchRecording = require('../src/SearchRecording.js');
var recordings;

//----------------------

recordings = new SearchRecording();

// Now, let's say we want to find Angra's recordings...
recordings.artist('Angra')

// ...released between 1993 and 2018...
recordings.date({min: 1993, max: 2018})

// ...and the title must contain "Holy" or "Judgement" or "Paradise"...
recordings.title(['Holy', 'Judgement', 'Paradise'], 'OR')

//----------------------

recordings.search()
.then(results => console.log(results))
.catch(er => console.log(er));
