var Search = require('./Search.js');
var Helper = require('./Helper.js');

class SearchRecording extends Search
{
    what      = 'recording';

    fields    = [
        'rid',              // The recording's Music Brainz id
        'recording',        // The title
        'recordingaccent',  // The title with accented characters retained
        'arid',             // The artist's Music Brainz id
        'artist',           // The artist's name
        'artistname',       // An artist on the recording
        'creditname',       // Name credit on the recording
        'date',             // The recording's release date
        'country',          // The release country, 2 letter ISO 3166-1 code
        'dur',              // Duration in milliseconds
        'format',           // The release's format (CD, vinyl etc)
        'isrc',             // ISRC of recording
        'number',           // Free text track number
        'position',         // The medium that the recording should be found on, first medium is position 1
        'qdur',             // Quantized duration

        'rgid',             // The release group's Music Brainz id
        'primarytype',      // Primary type of the release group
        'secondarytype',    // Secondary type of the release group
        'reid',             // The release's Music Brainz id
        'release',          // The release's title

        'status',           // The release's status (official, promotion, Bootleg, Pseudo-Release)
        'tid',              // Track id
        'tnum',             // Track number on medium

        'tracks',           // Number of tracks in the medium on release
        'tracksrelease',    // Number of tracks on release as a whole
        'tag',              // Musical genre, country, others
        'type',             // Type of the release group before the introduction of primary and secondary type fields
        'video'             // True to only show video tracks
    ];

    fieldAliases = {
        id                  : 'rid',
        title               : 'recording',
        releaseid           : 'reid',
        releasegroupid      : 'rgid',
        duration            : 'dur',
        tags                : 'tag'
    };

    getXpath()
    {
        return '//x:recording-list/x:recording';
    }

    minimalInformation(entry)
    {
        return {
            'rid'       : Helper.getAttrValue(entry, 'id'),
            'title'     : Helper.getElementValue(entry, 'x:title'),
            'artist'    : Helper.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'album'     : Helper.getElementValue(entry, 'x:release-list/x:release/x:title'),
            'position'  : Helper.parseInt(Helper.getElementValue(entry, "x:release-list/x:release/x:medium-list/x:medium/x:track-list[../x:format='CD']/x:track/x:number"))
        };
    }

    completeInformation(entry)
    {
		return {...this.minimalInformation(entry), ...{
            'length'            : Helper.getElementValue(entry, 'x:length'),
            'disambiguation'    : Helper.getElementValue(entry, 'x:disambiguation')
        }};
    }
}

module.exports = SearchRecording;
