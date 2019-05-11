# Release Groups in depth

**Preface: Release Group vs Release**  
A "release group" is an album. An album may be released in different regions at different dates, be remastered years later, etc. Each represents a different "release" inside a release group.

All releases are inserted in a release group even if the group is comprised of a single release.

For more details read:

- [Music Brainz's docs on release group](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Release_Group).  
- [Music Brainz's definition of release group](https://musicbrainz.org/doc/Release_Group).



Okay, moving on...

## Searching
The Music Brainz api accepts [lucene queries](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) and allow us to make searches based on a wide range of information. To help you build your query, Quick Discography offers a method for every parameter:

| Parameter          | Description                                        | Aliases     |
| ------------------ | -------------------------------------------------- | ----------- |
| rgid               | The release group's Music Brainz's id              | id          |
| releasegroup       | The title                                          | title, name |
| releasegroupaccent | The title with accented characters retained        |             |
| arid               | The artist's Music Brainz id                       | artistid    |
| artist             | The artist's name                                  |             |
| artistname         | "Real name” of a artist included the credits       |             |
| creditname         | In multi-artist credits, as it appears on the cover|             |
| primarytype        | Album, single, ep, other                           |             |
| secondarytype      | Audiobook, compilation, interview, live...         |             |
| releases           | Number of releases in this release group           |             |
| reid               | Music Brainz id of a release in the group          |             |
| release            | Name of a release that appears in the release group|             |
| status             | Status of a release within this group              |             |
| tag                | Musical genre, country, etc                        | tags        |
| type               | Type of the release group before the introduction of primary and secondary type fields |  |


## How the methods work?
All the methods listed above work the same, you must inform either:

- A term
- A list of terms
- A range

What we mean:
```js
// Must contain "metal" in the artist's name
releaseGroup.artist('kings')

// Must contain "metal" AND "kings" in the artist's name
releaseGroup.artist(['metal', 'kings'])

// Must contain "metal" OR "kings" in the artist's name
releaseGroup.artist(['metal', 'kings'], 'OR')

// Artist: from A to Z
releaseGroup.artist({min: 'A Balance of Power', max: 'Zadok'})
```

## Examples

```js
// Now, let's say we want to find the Metallica's...
releaseGroup.artist('Metallica')

// ...albuns...
releaseGroup.primaryType('album')

// ...that contain within it oficial releases...
releaseGroup.status('official')

// ...and no live performances, compilations or demos...
releaseGroup.secondarytype(['-live', '-compilation', '-demo'])

releaseGroup.search().then(results => console.log(results))
```

### Do it yourself
Or maybe you rather write your own [lucene query](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) instead of using our helping methods?

```js
releaseGroup.query('artist:"Metallica" AND primarytype:"album" AND status:"official"')

releaseGroup.search().then(results => console.log(results))
```

### What it will return

It will return an array of objects:

```json
[
    {
        rgid: '8fd32554-02a7-3788-a761-7012e0e75e55',
        title: 'Reload',
        artist: 'Metallica',
        type: 'Album',
        primarytype: 'Album',
        secondarytype: null
    },
    {
        rgid: '0da580f2-6768-498f-af9d-2becaddf15e0',
        title: 'Ride the Lightning',
        ...
    },
    {
        rgid: 'e389b7df-862d-3d91-a612-acca150f6e71',
        title: 'Load',
        ...
    },
    {
        rgid: 'e683880a-b1d7-3599-9f70-680ac56d8667',
        title: 'Garage Inc.',
        ...
    }
    ...
]

```

