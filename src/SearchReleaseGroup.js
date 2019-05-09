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
            'rgid'      : this.getAttrValue(entry, 'id'),
            'title'     : this.getElementValue(entry, 'x:title'),
            'artist'    : this.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'type'          : this.getAttrValue(entry, 'type'),
            'primarytype'   : this.getElementValue(entry, 'x:primary-type'),
            'secondarytype' : this.getElementsValues(entry, 'x:secondary-type-list/x:secondary-type'),
        }};
    }
}

SearchReleaseGroup.prototype.what   = 'release-group';
SearchReleaseGroup.prototype.fields =
{
    rgid                : null, // The release group's Music Brainz's id
    releasegroup        : null, // The title
    releasegroupaccent  : null, // The title with accented characters retained

    arid                : null, // The artist's Music Brainz id
    artist              : null, // The artist's name
    artistname          : null, // "Real name” of a artist included the credits
    creditname          : null, // In multi-artist credits, as it appears on the cover
    primarytype         : null, // Album, single, ep, other
    secondarytype       : null, // Audiobook, compilation, interview, live...
    releases            : null, // Number of releases in this release group
    reid                : null, // Music Brainz id of a release in the group
    release             : null, // Name of a release that appears in the release group
    status              : null, // Status of a release that appears within the release group
    tag                 : null, // Musical genre, country, others

    // aliases
    id                  : 'rgid',
    artistid            : 'arid',
    title               : 'releasegroup',
    name                : 'releasegroup',
    tags                : 'tag'
}

module.exports = SearchReleaseGroup;
