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
            'name'      : this.getElementValue(entry, 'x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'type'      : this.getAttrValue(entry, 'type'),
            'gender'    : this.getElementValue(entry, 'x:gender'),
            'area'      : this.getElementValue(entry, 'x:area/x:name'),
            'country'   : this.getElementValue(entry, 'x:country'),

            'ipi'       : this.getElementValue(entry, 'x:ipi-list/x:ipi'),

            'begin'     : this.getElementValue(entry, 'x:life-span/x:begin'),
            'end'       : this.getElementValue(entry, 'x:life-span/x:begin'),
            'beginArea' : this.getElementValue(entry, 'x:begin-area/x:name'),
            'endArea'   : this.getElementValue(entry, 'x:end-area/x:name'),
            'tags'      : this.getElementsValues(entry, 'x:tag-list/x:tag/x:name'),
            'alias'     : this.getElementsValues(entry, 'x:alias-list/x:alias')
        }};
    }
}

SearchArtist.prototype.type     = 'artist';
SearchArtist.prototype.fields   =
{
    arid            : null, // Music Brainz id
    artist          : null, // name
    artistaccent    : null, // name of the artist accented characters
    alias           : null, // previous/alternative names or misspellings
    comment         : null, // the artist's disambiguation comment
    type            : null, // Person, Group, Orchestra, Choir, Character, Other
    gender          : null, // male/female
    area            : null, // area mainly associated with the artist
    country         : null, // same as above, 2 letter ISO 3166-1 code

    // Person: birth and death, Group: foundation and dissolution
    begin           : null,
    end             : null,
    beginarea       : null,
    endarea         : null,

    tag             : null, // musical genre, country, others
    ipi             : null,

    // aliases
    id              : 'arid',
    name            : 'artist',
    title           : 'artist',
    tags            : 'tag'
}

module.exports = SearchArtist;
