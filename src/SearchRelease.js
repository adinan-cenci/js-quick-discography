var Search      = require('./Search.js');
const Helper    = require('./Helper.js');

class SearchRelease extends Search
{
    what    = 'release';

    fields  = [
        'reid',             // release's Music Brainz id
        'release',          // release's title
        'releaseaccent',    // title with accent characters retained
        'rgid',             // release group id

        'arid',             // The artist's Music Brainz id
        'artist',           // The artist's name
        'artistname',       // "Real name” of a artist included the credits

        'asin',             // The Amazon ASIN for this release
        'barcode',          // The barcode of this release
        'catno',            // The catalog number for this release, can have multiples when major using an imprint
        'comment',          // Disambiguation comment
        'country',          // The two letter country code for the release country
        'creditname',       // Name credit on the release, each artist added as a separate field
        'date',             // The release date (format: YYYY-MM-DD)
        'discids',          // total number of cd ids over all mediums for the release
        'discidsmedium',    // number of cd ids for the release on a medium in the release
        'format',           // release format
        'laid',             // The label id for this release, a release can have multiples when major using an imprint
        'label',            // The name of the label for this release, can have multiples when major using an imprint
        'lang',             // The language for this release. Use the three character ISO 639-3 codes to search for a specific language. (e.g. lang:eng)
        'mediums',          // number of mediums in the release
        'primarytype',      // primary type of the release group (album, single, ep, other)
        'secondarytype',    // secondary type of the release group (audiobook, compilation, interview, live, remix, soundtrack, spokenword)
        'puid',             // The release contains recordings with these puids
        'quality',          // The quality of the release (low, normal, high)
        'script',           // The 4 character script code (e.g. latn) used for this release
        'status',           // release status (e.g official)
        'tag',              // a tag that appears on the release
        'tracks',           // total number of tracks over all mediums on the release
        'tracksmedium',     // number of tracks on a medium in the release
        'type'              // type of the release group, old type mapping for when we did not have separate primary and secondary types
    ];

    fieldAliases = {
        id                  : 'reid',
        title               : 'release',
        name                : 'release',
        artistid            : 'arid',
    };

    getXpath()
    {
        return '//x:release';
    }

    minimalInformation(entry)
    {
        return {
            'reid'      : Helper.getAttrValue(entry, 'id'),
            'title'     : Helper.getElementValue(entry, 'x:title'),
            'artist'    : Helper.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'date'      : Helper.getElementValue(entry, 'x:date'),
            'type'      : Helper.getElementValue(entry, 'x:primary-type'),
            'status'    : Helper.getElementValue(entry, 'x:status')
        }};
    }
}

module.exports = SearchRelease;
