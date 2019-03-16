var Search = require('./Search.js').Search;

class SearchArtist extends Search 
{
    arid(arid) { this.fields.arid = arid; return this; }
    artist(artist) { this.fields.artist = artist; return this; }
    artistaccent(artistaccent) { this.fields.artistaccent = artistaccent; return this; }
    type(type) { this.fields.type = type; return this; } // person, group

    id(id) { this.fields.arid = id; return this; }
    name(name) { this.fields.artist = name; return this; }
    title(title) { this.fields.artist = title; return this; }

    parseXml() 
    {
        var results    = [];
        var select     = this.newXpathSelect();
        var gxi        = this;

        select('//x:artist-list/x:artist', this.dom).forEach(function(artist) 
        {
            var r = 
            {
                'id'        : artist.getAttributeNode('id').nodeValue, 
                'name'      : gxi.getValue(artist, 'x:name') 
            };

            results.push(r);
        });

        return results;
    }
}

SearchArtist.prototype.type = 'artist';

module.exports.SearchArtist = SearchArtist;