var Search = require('./Search.js');

/*
A musician (or musician persona),
group of musicians, or other music professional (like a producer or engineer).
Occasionally, it can also be a non-musical person (like a photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character ( like the Gorillaz )
*/

class SearchArtist extends Search
{
    getXpath()
    {
        return '//x:artist-list/x:artist';
    }

    minimalInformation(entry)
    {
        return {
            'id'        : this.getAttrValue(entry, 'id'),
            'name'      : this.getValue(entry, 'x:name')
        };
    }

    completeInformation(entry)
    {
        return {
            'id'        : this.getAttrValue(entry, 'id'),
            'type'      : this.getAttrValue(entry, 'type'),
            'name'      : this.getValue(entry, 'x:name'),
            'gender'    : this.getValue(entry, 'x:gender'),
            'area'      : this.getValue(entry, 'x:area/x:name'),
            'country'   : this.getValue(entry, 'x:country'),

            'ipi'       : this.getValue(entry, 'x:ipi-list/x:ipi'),

            'begin'     : this.getValue(entry, 'x:life-span/x:begin'),
            'end'       : this.getValue(entry, 'x:life-span/x:begin'),
            'beginArea' : this.getValue(entry, 'x:begin-area/x:name'),
            'endArea'   : this.getValue(entry, 'x:end-area/x:name'),
            'tags'      : this.getValues(entry, 'x:tag-list/x:tag/x:name'),
            'alias'     : this.getValues(entry, 'x:alias-list/x:alias')
        };
    }
}

SearchArtist.prototype.type     = 'artist';
SearchArtist.prototype.fields   =
{
    arid            : null,
    artist          : null, // name
    artistaccent    : null, // name of the artist accented characters
    alias           : null, // previous/alternative names or mispellings
    type            : null, // Person, Group, Orchestra, Choir, Character, Other
    area            : null, // area mainly associated with the artist
    country         : null,

    // Person: birth and death, Group: foundation and dissolution
    begin           : null,
    end             : null,

    beginarea       : null,
    endarea         : null,

    gender          : null,
    tag             : null,
    ipi             : null,

    // aliases
    id              : 'arid',
    name            : 'artist',
    title           : 'artist'
}

module.exports = SearchArtist;
