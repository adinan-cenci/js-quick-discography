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
            'title'     : this.getValue(entry, 'x:title')
        };
    }

    completeInformation(entry)
    {
        return {
            'id'            : this.getAttrValue(entry, 'id'),
            'type'          : this.getAttrValue(entry, 'type'),
            'title'         : this.getValue(entry, 'x:title'),
            'primaryType'   : this.getValue(entry, 'x:primary-type'),
            'secondaryType' : this.getValues(entry, 'x:secondary-type-list/x:secondary-type'),
        };
    }
}

SearchReleaseGroup.prototype.type   = 'release-group';
SearchReleaseGroup.prototype.fields =
{
    rgid                : null,
    releasegroup        : null, // title
    releasegroupaccent  : null, // title with any accent characters retained
    arid                : null, // artist id
    artist              : null,
    artistname          : null,
    creditname          : null,
    primarytype         : null,
    secondarytype       : null,
    releases            : null, // number of releases in this release group
    reid                : null, // A release that appears in the release group
    release             : null, // name of a release that appears in the release group
    status              : null,
    tag                 : null
}

module.exports = SearchReleaseGroup;
