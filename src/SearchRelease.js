var Search = require('./Search.js');

class SearchRelease extends Search 
{
    reid(reid) { this.fields.reid = reid; return this;}
    release(release) { this.fields.release = release; return this;}
    releaseaccent(releaseaccent) { this.fields.releaseaccent = releaseaccent; return this;}
    arid(arid) { this.fields.arid = arid; return this;}
    artist(artist) { this.fields.artist = artist; return this;}
    artistName(artistName) { this.fields.artistname = artistName; return this;}
    primaryType(primaryType) { this.fields.primarytype = primaryType; return this;}
    status(status) { this.fields.status = status; return this;}

    id(id) { this.fields.reid = id; return this;}
    title(title) { this.fields.release = title; return this;}
    artistId(artistId) { this.fields.arid = artistId; return this;}

    parseXml() 
    {        
        var results    = [];
        var select     = this.newXpathSelect();
        var gxi        = this;

        select('//x:release', this.dom).forEach(function(release) 
        {
            var r = 
            {
                'id'        : release.getAttributeNode('id').nodeValue, 
                'title'     : gxi.getValue(release, 'x:title'), 
                'date'      : gxi.getValue(release, 'x:date'), 
                'artist'    : gxi.getValue(release, 'x:artist-credit/x:name-credit/x:artist/x:name'), 
                'type'      : gxi.getValue(release, 'x:status'), 
                'status'    : gxi.getValue(release, '//x:primary-type')
            };

            results.push(r);
        });

        return results;
    }
}

SearchRelease.prototype.type = 'release';
SearchRelease.prototype.fields = 
{
    'query'             : '', 
    'primarytype'       : 'album', 
    'status'            : 'official'
};

module.exports = SearchRelease;