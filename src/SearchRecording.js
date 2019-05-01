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
            'title'     : this.getValue(entry, 'x:title'),
            'artist'    : this.getValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'album'     : this.getValue(entry, 'x:release-list/x:release/x:title'),
        };
    }

    completeInformation(entry)
    {
        return {
            'title'             : this.getValue(entry, 'x:title'),
            'length'            : this.getValue(entry, 'x:length'),
            'disambiguation'    : this.getValue(entry, 'x:disambiguation'),
            'artist'            : this.getValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'album'             : this.getValue(entry, 'x:release-list/x:release/x:title'),
        };
    }
}

SearchRecording.prototype.type      = 'recording';
SearchRecording.prototype.fields    =
{
    rid                 : null, // release id
    recording           : null, // title
    recordingaccent     : null, // title with accented characters
    arid                : null, // artist's id
    artist              : null, // artist's name
    artistName          : null, // artist's name with accented characters
    creditName          : null,
    country             : null,
    date                : null,
    dur                 : null,
    format              : null,
    isrc                : null,
    number              : null, // track number
    position            : null,
    qdur                : null,

    rgid                : null, // release group id
    primarytype         : null, // album, single, ep, other
    secondaryType       : null, // audiobook, compilation, interview, live, remix soundtrack, spokenword
    reid                : null, // release id
    release             : null,

    status              : null,
    tid                 : null,  // track id
    tnum                : null,

    tracks              : null,
    tracksrelease       : null,
    tag                 : null,
    type                : null,
    video               : null,

    // aliases
    id                  : 'rid',
    title               : 'recording',
    releaseId           : 'reid',
    duration            : 'dur'
}

module.exports = SearchRecording;
