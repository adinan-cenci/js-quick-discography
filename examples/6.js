const SearchArtist          = require('../src/SearchArtist.js');
const SearchReleaseGroup    = require('../src/SearchReleaseGroup.js');
const SearchRelease         = require('../src/SearchRelease.js');
const SearchRecording       = require('../src/SearchRecording.js');

//--------------------

sArtist         = new SearchArtist();
sReleaseGroup   = new SearchReleaseGroup();
sRelease        = new SearchRelease();
sRecording      = new SearchRecording();

//--------------------

sArtist.tag('Power metal')

// ...in Sweden, Norway, Finland and Germany...
sArtist.country(['SE', 'NO', 'FI', 'DE'])

// ...founded between 1970 and 1990
sArtist.begin({min: 1970, max: 1990})

console.log(sArtist.getLuceneQuery())

/*
sRelease.title('Nightfall in Middle-Earth').artist('Blind Guardian').search().then( (releases) =>
{
    sRecording.complete();
    sRecording.releaseId(releases[0].id).search().then( (recordings) =>
    {
        console.log(releases[0].id);
        console.log(recordings);
    })
})
*/
