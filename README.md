# Quick discography

This is a small library to retrieve basic information from [MusicBrainz](https://musicbrainz.org/), the open music encyclopedia.

### Searching for an artists

```js
const quickDisc = require('quick-discography');
var artists     = new quickDisc.SearchArtist();

//-----------

artists
.artist('Leo Maia')         // The name
.artistAccent('Léo Maia')   // The name with accented characters retained
.type('Person');            // Person, group...

//-----------

artists.search()
.then(results => console.log(results));
```

For more details and how to refine your terms, [click here](docs/artists-in-depth.md).



### Searching for release groups ( albums )

```js
var releasesGroups = new quickDisc.SearchReleaseGroup();

//-----------

releasesGroups
.artist('Blind Guardian')   // The artist's name
.primaryType('Album')       // Album, single, ep, other. Defaults to "album"
.status('Official');        // Official, promotion, Bootleg, Pseudo-Release.

//-----------

releases.search()
.then(results => console.log(results));
```

For more details and how to refine your terms, [click here](docs/release-groups-in-depth.md).



### Searching for recordings

```js
var recordings = new quickDisc.SearchRecording();

//-----------

recordings
.artist('Blind Guardian')               // The artist's name
.release('Nightfall in Middle-Earth')   // The release's name ( not the release group )

//-----------

recordings.search()
.then(results => console.log(results));
```

For more details and how to refine your terms, [click here](docs/recordings-in-depth.md).



## Pagination

The Music Brainz api supports pagination:

```js
recordings
.offset(0)
.limit(100) // defaults to 50
```



## How to install

Use npm:

```cdm
npm i adinan-cenci/js-quick-discography
```
