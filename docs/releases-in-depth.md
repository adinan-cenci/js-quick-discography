# Releases in depth

**Preface: Release Group vs Release**  
A "release group" is an album. An album may be released in different regions at different dates, be remastered years later, etc. Each represents a different "release" inside a release group.

All releases are inserted in a release group even if the group is comprised of a single release.

For more details read:

- [Music Brainz's docs on release](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Release).  
- [Music Brainz's definition of release](https://musicbrainz.org/doc/Release).

Okay, moving on...

## Searching
The Music Brainz api accepts [lucene queries](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) and allow us to make searches based on a wide range of information. To help you build your query, Quick Discography offers a method for every parameter:

| Parameter          | Description                                        | Aliases     |
| ------------------ | -------------------------------------------------- | ----------- |
| reid               | The release's Music Brainz id                     | id |
| release            | The release's title                              | title |
| releaseaccent      | The title with accent characters retained          |             |
| arid               | The artist's Music Brainz id                       |             |
| artist             | The artist's name                                  |             |
| artistname         | "Real name" of a artist included the credits      |             |
| asin               | The Amazon ASIN for this release                   |             |
| barcode            | The barcode of this release                        |             |
| catno              | The catalog number for this release, can have multiples when major using an imprint|    |
| comment            | Disambiguation comment                             |             |
| country            | The two letter country code for the release country|             |
| creditname         | Name credit on the release                         |             |
| date               | The release date (format: YYYY-MM-DD)              |             |
| discids            | Number of cds ids over all mediums for the release |             |
| discidsmedium      | Number of cd ids for the release on a medium in the release|     |
| format             | release format                                     |             |
| laid               | The label id for this release, a release can have multiples when major using an imprint|   |
| label              | The name of the label for this release, can have multiples when major using an imprint|    |
| lang               | Release language, 3 character ISO 639-3 code       |             |
| mediums            | Number of mediums in the release                   |             |
| primarytype        | Primary type of the release group ( Album, single, ep, other ) |             |
| secondarytype      | Secondary type of the release group |    |
| puid               | The release contains recordings with these puids   |             |
| quality            | The quality of the release (low, normal, high)     |             |
| rgid               | Release group's Music Brainz id                    |             |
| script             | The 4 character script code (e.g. latn) used for this release|   |
| status             | Release status (e.g official)                     |             |
| tag                | Musical genre, country, others |             |
| tracks             | Total number of tracks over all mediums on the release|          |
| tracksmedium       | Number of tracks on a medium in the release        |             |
| type               | Type of the release group before the introduction of primary and secondary type fields|  |



## How the methods work?
All the methods listed above work the same, you must inform either:

- A term
- A list of terms
- A range

What we mean:
```js
// Must contain "metal" in the artist's name
release.artist('kings')

// Must contain "metal" AND "kings" in the artist's name
release.artist(['metal', 'kings'])

// Must contain "metal" OR "kings" in the artist's name
release.artist(['metal', 'kings'], 'OR')

// Artist: from A to Z
release.artist({min: 'A Balance of Power', max: 'Zadok'})
```

### Examples
```js
// Now, let's say we want to find the Metallica's...
release.artist('Metallica')

// ...albuns...
release.primaryType('album')

// ...that contain within it oficial releases...
release.status('official')

// ...and no live performances, compilations or demos...
release.secondarytype(['-live', '-compilation', '-demo'])

release.search().then(results => console.log(results))
```

### Do it yourself
Maybe you rather write your own [lucene query](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) instead of using our helping methods?

```js
release.query('artist:"Metallica" AND primarytype:"album" AND (-secondarytype:"live" AND -secondarytype:"compilation" AND -secondarytype:"demo") AND status:"official"')

release.search().then(results => console.log(results))
```

### What it will return

It will return an array of objects:

```json
[
    {
        reid: '4c77bcd6-0bb3-4366-815a-cb5ee574eef1',
        title: 'Reload',
        artist: 'Metallica',
        date: null,
        type: null,
        status: 'Official'
    },
    {
        reid: '0877d3eb-5d80-4e7d-b5d4-eb36d4dbc3ce',
        title: 'Reload',
        ...
    },
    {
        reid: 'dd0d1969-8804-429b-aff9-9ee4cdc3e278',
        title: 'Reload',
        ...
    },
    {
        reid: 'b8073dfc-1b9c-4a63-adac-695210510fde',
        title: 'Reload',
        ...
    },
    ...
]
```

