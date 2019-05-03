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
            'id'        : this.getAttrValue(release, 'id'),
            'title'     : this.getElementValue(release, 'x:title'),
            'date'      : this.getElementValue(release, 'x:date'),
            'artist'    : this.getElementValue(release, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'type'      : this.getElementValue(release, 'x:primary-type'),
            'status'    : this.getElementValue(release, 'x:status')
        };
    }
}

SearchRelease.prototype.type    = 'release';
SearchRelease.prototype.fields  =
{
    reid            : null, // Music Brainz id
    release         : null, // title
    releaseaccent   : null, // title with any accent characters
    arid            : null, // artist's Music Brainz id
    artist          : null, // artist's name
    artistname      : null,
    primarytype     : null, // album, single, ep, other
    status          : null, // official, promotion, Bootleg, Pseudo-Release

    // aliases
    id:             'reid',
    title:          'release',
    artistid:       'arid',
};

module.exports = SearchRelease;
