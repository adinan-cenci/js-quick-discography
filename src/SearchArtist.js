var Search      = require('./Search.js');
const Helper    = require('./Helper.js');

/*
A musician (or musician persona),
group of musicians, or other music professional (like a producer or engineer).
Occasionally, it can also be a non-musical person (like a photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character ( like the Gorillaz )
*/

class SearchArtist extends Search
{
    what     = 'artist';

    fields   = [
        'arid',         // Music Brainz id
        'artist',       // name
        'artistaccent', // name of the artist accented characters
        'alias',        // previous/alternative names or misspellings
        'comment',      // the artist's disambiguation comment
        'type',         // Person, Group, Orchestra, Choir, Character, Other
        'gender',       // male/female
        'area',         // area mainly associated with the artist
        'country',      // same as above, 2 letter ISO 3166-1 code

        // Person: birth and death, Group: foundation and dissolution
        'begin',
        'end',
        'beginarea',
        'endarea',

        'tag',          // musical genre, country, others
        'ipi'           // https://musicbrainz.org/doc/IPI
    ];

    fieldAliases = {
        id              : 'arid',
        name            : 'artist',
        title           : 'artist',
        tags            : 'tag'
    };

    getXpath()
    {
        return '//x:artist-list/x:artist';
    }

    minimalInformation(entry)
    {
        return {
            'arid'      : Helper.getAttrValue(entry, 'id'),
            'name'      : Helper.getElementValue(entry, 'x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'type'      : Helper.getAttrValue(entry, 'type'),
            'gender'    : Helper.getElementValue(entry, 'x:gender'),
            'area'      : Helper.getElementValue(entry, 'x:area/x:name'),
            'country'   : Helper.getElementValue(entry, 'x:country'),

            'ipi'       : Helper.getElementValue(entry, 'x:ipi-list/x:ipi'),

            'begin'     : Helper.getElementValue(entry, 'x:life-span/x:begin'),
            'beginArea' : Helper.getElementValue(entry, 'x:begin-area/x:name'),

            'end'       : Helper.getElementValue(entry, 'x:life-span/x:begin'),
            'endArea'   : Helper.getElementValue(entry, 'x:end-area/x:name'),

            'tags'      : Helper.getElementsValues(entry, 'x:tag-list/x:tag/x:name'),
            'alias'     : Helper.getElementsValues(entry, 'x:alias-list/x:alias')
        }};
    }
}

module.exports = SearchArtist;
