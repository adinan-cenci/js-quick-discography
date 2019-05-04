var Search = require('./Search.js');

/*
Releases and Release Groups are "albums" in a general sense.
BUT: A release is a CD or a vinyl record, a release group is
the overall album, doesn't matter how many CDs or
editions/versions it had.

An artist says: "We've released our new album", that's a
release group. The publisher says: "This album gets released
next week in Japan and next month in Europe" they're referring
to the different releases that belong in the above mentioned
release group.

All releases are inserted in a release group
*/

class SearchReleaseGroup extends Search
{
    getXpath()
    {
        return '//x:release-group-list/x:release-group';
    }

    minimalInformation(entry)
    {
        return {
            'id'        : this.getAttrValue(entry, 'id'),
            'title'     : this.getElementValue(entry, 'x:title')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'type'          : this.getAttrValue(entry, 'type'),
            'primaryType'   : this.getElementValue(entry, 'x:primary-type'),
            'secondaryType' : this.getElementsValues(entry, 'x:secondary-type-list/x:secondary-type'),
        }};
    }
}

SearchReleaseGroup.prototype.type   = 'release-group';
SearchReleaseGroup.prototype.fields =
{
    rgid                : null, // Music Brainz id
    releasegroup        : null, // title
    releasegroupaccent  : null, // title with any accent characters retained
    arid                : null, // artist's Music Brainz id
    artist              : null, // artist's name
    artistname          : null,
    creditname          : null,
    primarytype         : null,
    secondarytype       : null,
    releases            : null,
    reid                : null,
    release             : null,
    status              : null, // status of a release that appears within the release group
    tag                 : null, // musical genre, country, others

    // aliases
    id                  : 'rgid',
    artistid            : 'arid',
    title               : 'releasegroup',
    name                : 'releasegroup',
    tags                : 'tag'
}

module.exports = SearchReleaseGroup;
