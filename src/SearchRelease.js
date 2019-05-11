var Search = require('./Search.js');

class SearchRelease extends Search
{
    getXpath()
    {
        return '//x:release';
    }

    minimalInformation(entry)
    {
        return {
            'reid'      : this.getAttrValue(entry, 'id'),
            'title'     : this.getElementValue(entry, 'x:title'),
            'artist'    : this.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'date'      : this.getElementValue(entry, 'x:date'),
            'type'      : this.getElementValue(entry, 'x:primary-type'),
            'status'    : this.getElementValue(entry, 'x:status')
        }};
    }
}

SearchRelease.prototype.what    = 'release';
SearchRelease.prototype.fields  =
{
    reid                : null, // release's Music Brainz id
    release             : null, // release's title
    releaseaccent       : null, // title with accent characters retained
    rgid                : null, // release group id

    arid                : null, // The artist's Music Brainz id
    artist              : null, // The artist's name
    artistname          : null, // "Real name” of a artist included the credits

    asin                : null, // The Amazon ASIN for this release
    barcode             : null, // The barcode of this release
    catno               : null, // The catalog number for this release, can have multiples when major using an imprint
    comment             : null, // Disambiguation comment
    country             : null, // The two letter country code for the release country
    creditname          : null, // Name credit on the release, each artist added as a separate field
    date                : null, // The release date (format: YYYY-MM-DD)
    discids             : null, // total number of cd ids over all mediums for the release
    discidsmedium       : null, // number of cd ids for the release on a medium in the release
    format              : null, // release format
    laid                : null, // The label id for this release, a release can have multiples when major using an imprint
    label               : null, // The name of the label for this release, can have multiples when major using an imprint
    lang                : null, // The language for this release. Use the three character ISO 639-3 codes to search for a specific language. (e.g. lang:eng)
    mediums             : null, // number of mediums in the release
    primarytype         : null, // primary type of the release group (album, single, ep, other)
    secondarytype       : null, // secondary type of the release group (audiobook, compilation, interview, live, remix, soundtrack, spokenword)
    puid                : null, // The release contains recordings with these puids
    quality             : null, // The quality of the release (low, normal, high)
    script              : null, // The 4 character script code (e.g. latn) used for this release
    status              : null, // release status (e.g official)
    tag                 : null, // a tag that appears on the release
    tracks              : null, // total number of tracks over all mediums on the release
    tracksmedium        : null, // number of tracks on a medium in the release
    type                : null, // type of the release group, old type mapping for when we did not have separate primary and secondary types

    // aliases
    id                  : 'reid',
    title               : 'release',
    name                : 'release',
    artistid            : 'arid',
};

module.exports = SearchRelease;
