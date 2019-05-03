var Search = require('./Search.js');

class SearchRecording extends Search
{
    getXpath()
    {
        return '//x:recording-list/x:recording';
    }

    minimalInformation(entry)
    {
        return {
            'title'     : this.getElementValue(entry, 'x:title'),
            'artist'    : this.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'album'     : this.getElementValue(entry, 'x:release-list/x:release/x:title'),
        };
    }

    completeInformation(entry)
    {
        return {
            'title'             : this.getElementValue(entry, 'x:title'),
            'length'            : this.getElementValue(entry, 'x:length'),
            'disambiguation'    : this.getElementValue(entry, 'x:disambiguation'),
            'artist'            : this.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'album'             : this.getElementValue(entry, 'x:release-list/x:release/x:title'),
        };
    }
}

SearchRecording.prototype.type      = 'recording';
SearchRecording.prototype.fields    =
{
    rid                 : null, // Music Brainz id
    recording           : null, // title
    recordingaccent     : null, // title with accented characters
    arid                : null, // artist's Music Brainz id
    artist              : null, // artist's name
    artistname          : null, // artist's name with accented characters
    creditname          : null,
    country             : null,
    date                : null,
    dur                 : null, // duration in milliseconds
    format              : null,
    isrc                : null,
    number              : null,
    position            : null,
    qdur                : null,

    rgid                : null, // release group Music Brainz id
    primarytype         : null,
    secondaryType       : null,
    reid                : null, // release's Music Brainz id
    release             : null, // release's name

    status              : null, // official, promotion, Bootleg, Pseudo-Release
    tid                 : null,
    tnum                : null,

    tracks              : null,
    tracksrelease       : null,
    tag                 : null,
    type                : null,
    video               : null,

    // aliases
    id                  : 'rid',
    title               : 'recording',
    releaseid           : 'reid',
    releasegroupid      : 'rgid',
    duration            : 'dur'
}

module.exports = SearchRecording;
