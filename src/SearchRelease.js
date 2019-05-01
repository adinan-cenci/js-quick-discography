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
            'title'     : this.getValue(release, 'x:title'),
            'date'      : this.getValue(release, 'x:date'),
            'artist'    : this.getValue(release, 'x:artist-credit/x:name-credit/x:artist/x:name'),
            'type'      : this.getValue(release, 'x:primary-type'),
            'status'    : this.getValue(release, 'x:status')
        };
    }
}

SearchRelease.prototype.type    = 'release';
SearchRelease.prototype.fields  =
{
    reid            : null,
    release         : null,
    releaseaccent   : null,
    arid            : null,
    artist          : null,
    artistname      : null,
    primarytype     : null,
    status          : null,

    // aliases
    id:             'reid',
    title:          'release',
    artistId:       'arid', 
};

module.exports = SearchRelease;
