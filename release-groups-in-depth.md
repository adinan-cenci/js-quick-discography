# Release Groups in depth

[ ========== DRAFT ========== ]

**Preface: Release Group vs Release**

Before we start, it is important to understand the difference between "Release Group" and "Release". Releases and Release Groups are "albums" in a general sense, **BUT**: a release is a CD or a vinyl record, a release group is the overall album, it doesn't matter how many CDs or editions/versions it had.

An artist says: "We've released our new album", that's a release group. The publisher says: "This album gets released next week in Japan and next month in Europe" they're referring to the different releases that belong in the above mentioned release group.

All releases are inserted in a release group even if the group is comprised of a single release. Ok, moving on...

## Searching

The Music Brainz api allow us to search for release groups based on a wide range of information and Quick Discography has a method for every parameter:

| Field              | Description                                        | Aliases     |
| ------------------ | -------------------------------------------------- | ----------- |
| rgid               | Music Brainz's release group id                    | id          |
| releasegroup       | The group's name                                   | title, name |
| releasegroupaccent | The group's name with accented characters retained |             |
| arid               | The artist's Music Brainz id                       | artistid    |
| artist             | The artist's name                                  |             |
| artistname         |                                                    |             |
| creditname         |                                                    |             |
| primarytype        |                                                    |             |
| secondarytype      |                                                    |             |
| releases           |                                                    |             |
| reid               |                                                    |             |
| status             |                                                    |             |
| tag                |                                                    | tags        |

[Music Brainz api documentation](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Release_Group "(target|_blank)").  
[Music Brainz definition of release group](https://musicbrainz.org/doc/Release_Group "(target|_blank)").



## How they work?

All the methods listed above work the same, you must inform either:

- A term
- A list of terms
- A range

What we mean:

```js
// Must contain "metal" in the name
artist.name('metal')

// Must contain "metal" OR "kings" in the name
artist.name(['metal', 'kings'])

// Must contain "metal" AND "kings" in the name
artist.name(['metal', 'kings'], 'AND')

// Countries: from Argentina to Zimbabwe
artist.name({min: 'AF', max: 'ZW'}); // 
```

### Examples

```js
// Now, let's say we want to find Power Metal...
artists.tag('Power metal')

// ...bands...
artists.type('Group')

// ...in Sweden, Norway, Finland and Germany...
artists.country(['SE', 'NO', 'FI', 'DE'])

// ...founded between 1980 and 1990
artists.begin({min: 1970, max: 1990})
```



## Do it yourself

Maybe you rather write your own [lucene](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) query instead of using our helping methods?

```js
artists.query('tag:"Power metal" AND type:"Group" AND (country:"SE" OR country:"NO" OR country:"FI" OR country:"DE") AND begin:[1970 TO 1990]');
```

