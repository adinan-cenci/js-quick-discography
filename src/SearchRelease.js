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
            'id'        : this.getAttrValue(entry, 'id'),
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

SearchRelease.prototype.type    = 'release';
SearchRelease.prototype.fields  =
{
    reid            : null,         // Music Brainz id
    release         : null,         // title
    releaseaccent   : null,         // title with any accent characters
    arid            : null,         // artist's Music Brainz id
    artist          : null,         // artist's name
    artistname      : null,
    primarytype     : 'album',      // album, single, ep, other
    status          : 'official',   // official, promotion, Bootleg, Pseudo-Release

    // aliases
    id              : 'reid',
    title           : 'release',
    name            : 'release',
    artistid        : 'arid',
};

module.exports = SearchRelease;
