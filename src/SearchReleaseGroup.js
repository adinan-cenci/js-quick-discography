var Search      = require('./Search.js');
const Helper    = require('./Helper.js');

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
    what   = 'release-group';

    fields = [
        'rgid',                 // The release group's Music Brainz's id
        'releasegroup',         // The title
        'releasegroupaccent',   // The title with accented characters retained

        'arid',                 // The artist's Music Brainz id
        'artist',               // The artist's name
        'artistname',           // "Real name” of a artist included the credits
        'creditname',           // In multi-artist credits, as it appears on the cover
        'primarytype',          // Album, single, ep, other
        'secondarytype',        // Audiobook, compilation, interview, live...
        'releases',             // Number of releases in this release group
        'reid',                 // Music Brainz id of a release in the group
        'release',              // Name of a release that appears in the release group
        'status',               // Status of a release that appears within the release group
        'tag'                   // Musical genre, country, others
    ];

    fieldAliases = {
        id                  : 'rgid',
        artistid            : 'arid',
        title               : 'releasegroup',
        name                : 'releasegroup',
        tags                : 'tag'
    }

    getXpath()
    {
        return '//x:release-group-list/x:release-group';
    }

    minimalInformation(entry)
    {
        return {
            'rgid'      : Helper.getAttrValue(entry, 'id'),
            'title'     : Helper.getElementValue(entry, 'x:title'),
            'artist'    : Helper.getElementValue(entry, 'x:artist-credit/x:name-credit/x:artist/x:name')
        };
    }

    completeInformation(entry)
    {
        return {...this.minimalInformation(entry), ...{
            'primaryType'   : Helper.getElementValue(entry, 'x:primary-type'),
            'secondaryType' : Helper.getElementsValues(entry, 'x:secondary-type-list/x:secondary-type'),
            'type'          : Helper.getAttrValue(entry, 'type'),
        }};
    }
}

module.exports = SearchReleaseGroup;
