# Release Groups in depth

**Preface: Release Group vs Release**

[As stated in the documentation](https://musicbrainz.org/doc/Release_Group), releases and release Groups are "albums" in a general sense **BUT**: a release is a CD or a vinyl record, a release group is the overall album, it doesn't matter how many CDs or editions/versions it had.

An artist says: "We've released our new album", that's a release group. The publisher says: "This album gets released next week in Japan and next month in Europe" they're referring to the different releases that belong in the mentioned release group.

All releases are inserted in a release group even if the group is comprised of a single release.

Okay, moving on...

## Searching

The Music Brainz api accepts [lucene queries](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) and allow us to make searches based on a wide range of information. To help you build your query, Quick Discography offers a method for every parameter:

| Parameter          | Description                                        | Aliases     |
| ------------------ | -------------------------------------------------- | ----------- |
| rgid               | Music Brainz's release group id                    | id          |
| releasegroup       | The group's name                                   | title, name |
| releasegroupaccent | The group's name with accented characters retained |             |
| arid               | The artist's Music Brainz id                       | artistid    |
| artist             | The artist's name                                  |             |
| artistname         |                                                    |             |
| creditname         |                                                    |             |
| primarytype        | album, single, ep, other                           |             |
| secondarytype      |                                                    |             |
| releases           |                                                    |             |
| reid               |                                                    |             |
| status             | Status of a release within this group              |             |
| tag                | Musical genre, country, etc                        | tags        |

[Music Brainz's docs on release group](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Release_Group).  
[Music Brainz's definition of release group](https://musicbrainz.org/doc/Release_Group).



## How the methods work?

All the methods listed above work the same, you must inform either:

- A term
- A list of terms
- A range

What we mean:

```js
// Must contain "metal" in the artist's name
releaseGroup.artist('kings')

// Must contain "metal" OR "kings" in the artist's name
releaseGroup.artist(['metal', 'kings'])

// Must contain "metal" AND "kings" in the artist's name
releaseGroup.artist(['metal', 'kings'], 'AND')

// Artist: from A to Z
releaseGroup.artist({min: 'A Balance of Power', max: 'Zadok'})
```

### Examples

```js
// Now, let's say we want to find the Metallica's...
releaseGroup.artist('Metallica')

// ...albuns...
releaseGroup.primaryType('album')

// ...that contain within it oficial releases...
releaseGroup.status('official')
```

### Do it yourself

Maybe you rather write your own [lucene](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) query instead of using our helping methods?

```js
releaseGroup.query('artist:"Metallica" AND primarytype:"album" AND status:"official"');
```

