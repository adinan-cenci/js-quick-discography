# Recordings in depth
**Preface: Recording, recording groups and releases**  
A "release group" is an album. An album may be released in different regions at different dates, be remastered years later, etc. Each represents a different "release" inside a release group.

All releases are inserted in a release group even if the group is comprised of a single release.

A "recording" represents a track in a release.

For more details read:

- [Music Brainz's docs on recordings](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Recording). 
- [Music Brainz's definition of recording](https://musicbrainz.org/doc/Recording).

Okay, moving on...

## Searching
The Music Brainz api accepts [lucene queries](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description)
and allow us to make searches based on a wide range of information. To help you build your query,
Quick Discography offers a method for every parameter:

| Parameter       | Description                                             | Aliases        |
| --------------- | ------------------------------------------------------- | -------------- |
| rid             | The recording's Music Brainz id                         | id             |
| recording       | The title                                               | title          |
| recordingaccent | The title with accented characters retained             |                |
| arid            | The artist's Music Brainz id                            |                |
| artist          | The artist's name                                       |                |
| artistname      | An artist on the recording                              |                |
| creditname      | Name credit on the recording                            |                |
| date            | The recording's release date                            |                |
| country         | The release country, 2 letter ISO 3166-1 code           |                |
| dur             | Duration in milliseconds                                | duration       |
| format          | The release's format (CD, vinyl etc)                    |                |
| isrc            | [ISRC](https://musicbrainz.org/doc/ISRC) of recording   |                |
| number          | Free text track number                                  |                |
| position        | The medium that the recording should be found on, first medium is position 1 |                |
| qdur            | Quantized duration                                      |                |
| rgid            | The release group's Music Brainz id                     | releasegroupid |
| primarytype     | Primary type of the release group                       |                |
| secondarytype   | Secondary type of the release group                     |                |
| reid            | The release's Music Brainz id                           | releaseid      |
| release         | The release's title                                     |                |
| status          | The release's status                                    |                |
| tid             | Track id                                                |                |
| tnum            | Track number on medium                                  |                |
| tracks          | Number of tracks in the medium on release               |                |
| tracksrelease   | Number of tracks on release as a whole                  |                |
| tag             | Musical genre, country, others                          | tags           |
| type            | Type of the release group before the introduction of primary and secondary type fields |  |
| video           | True to only show video tracks                          |                |


## How the methods work?
All the methods listed above work the same, you must inform either:
- A term
- A list of terms
- A range

What we mean:
```js
// Must contain "metal" in the name
recordings.name('metal')

// Must contain "metal" AND "kings" in the name
recordings.name(['metal', 'kings'])

// Must contain "metal" OR "kings" in the name
recordings.name(['metal', 'kings'], 'OR')

// Countries: from A to Z ( Argentina to Zimbabwe )
recordings.name({min: 'AF', max: 'ZW'})
```

### Examples
```js
// Now, let's say we want to find Angra's recordings...
recordings.artist('Angra')

// ...released between 1993 and 2018...
recordings.date({min: 1993, max: 2018})

// ...and the title must contain "Holy" or "Judgement" or "Paradise"...
recordings.title(['Holy', 'Judgement', 'Paradise'], 'OR')
```

### Do it yourself
Maybe you rather write your own [lucene query](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) instead of using our helping methods?

```js
recordings.query('(recording:"Holy" OR recording:"Judgement" OR recording:"Paradise") AND artist:"Angra" AND date:[1993 TO 2018]')
```
### What it will return

It will return an array of objects:

```json
[
    {
        "rid": "62c375e8-2675-4a53-bf6a-77537259c2a0",
        "title": "Judgement Day",
        "artist": "Angra",
        "album": "Rebirth",
        "position": "8",
        "length": "340173",
        "disambiguation": "null"
    },
    {
        "rid": "03036d58-66db-4e7c-a25a-7646cbaac269",
        "title": "Paradise"
    },
    {
        "rid": "2950bb91-183b-460d-a39e-9e3a02d88536",
        "title": "Holy Land"
    },
    {
        "rid": "a339e7b3-a32d-4e33-adb9-a381b9bf81a3",
        "title": "Holy Land"
    }
]
```

