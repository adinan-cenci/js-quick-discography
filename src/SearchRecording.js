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
            'position'  : Search.parseInt(this.getElementValue(entry, "x:release-list/x:release/x:medium-list/x:medium/x:track-list[../x:format='CD']/x:track/x:number"))
        };
    }

    completeInformation(entry)
    {
		return {...this.minimalInformation(entry), ...{
            'length'            : this.getElementValue(entry, 'x:length'),
            'disambiguation'    : this.getElementValue(entry, 'x:disambiguation')
        }};
    }
}

SearchRecording.prototype.type      = 'recording';
SearchRecording.prototype.fields    =
{
    rid                 : null, // The recording's Music Brainz id
    recording           : null, // The title
    recordingaccent     : null, // The title with accented characters retained
    arid                : null, // The artist's Music Brainz id
    artist              : null, // The artist's name
    artistname          : null, // An artist on the recording
    creditname          : null, // Name credit on the recording
    date                : null, // The recording's release date
    country             : null, // The release country, 2 letter ISO 3166-1 code
    dur                 : null, // Duration in milliseconds
    format              : null, // The release's format (CD, vinyl etc)
    isrc                : null, // ISRC of recording
    number              : null, // Free text track number
    position            : null, // The medium that the recording should be found on, first medium is position 1
    qdur                : null, // Quantized duration

    rgid                : null, // The release group's Music Brainz id
    primarytype         : null, // Primary type of the release group
    secondarytype       : null, // Secondary type of the release group
    reid                : null, // The release's Music Brainz id
    release             : null, // The release's title

    status              : null, // The release's status (official, promotion, Bootleg, Pseudo-Release)
    tid                 : null, // Track id
    tnum                : null, // Track number on medium

    tracks              : null, // Number of tracks in the medium on release
    tracksrelease       : null, // Number of tracks on release as a whole
    tag                 : null, // Musical genre, country, others
    type                : null, // Type of the release group before the introduction of primary and secondary type fields
    video               : null, // True to only show video tracks

    // aliases
    id                  : 'rid',
    title               : 'recording',
    releaseid           : 'reid',
    releasegroupid      : 'rgid',
    duration            : 'dur',
    tags                : 'tag'
}

module.exports = SearchRecording;
