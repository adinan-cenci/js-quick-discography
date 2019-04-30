# Quick discography

A small library to retrieve basic information from [MusicBrainz](https://musicbrainz.org/), the open music encyclopedia.



### Searching for artists

```js
const quickDisc = require('quick-discography');
var artists     = new quickDisc.SearchArtist();

//-----------

artists
.artist('blind')        // The name
.artistaccent('blind')  // The name with accented characters
.type('group');         // Person, group... Defaults to "artist"

//-----------

artists.search()
.then(results => console.log(results))
.catch(er => console.log(er));
```



### Searching for releases

```js
var releases = new quickDisc.SearchRelease();

//-----------

releases
.release(release)               // The title
.releaseaccent(releaseaccent)   // The title with accented characters
.arid(arid)                     // The artist's id
.artist(artist)                 // As in the band
.artistName(artistName)         // An artist on the release
.primaryType(primaryType)       // Album, single, ep, other. Defaults to "album"
.status(status);                // Official, promotion, Bootleg, Pseudo-Release. Defaults to "official"

//-----------

releases.search()
.then(results => console.log(results))
.catch(er => console.log(er));
```



### Searching for recordings

```js
var recordings = new quickDisc.SearchRecording();

//-----------

recordings
.recording(recording)               // The title
.recordingaccent(recordingaccent)   // The title with accented characters
.arid(arid)                         // The artist's id
.artist(artist)                     // The artist's name
.artistName(artistName)             // An artist on the recording
.reid(reid)                         // The release's id
.release(release)                   // The release's title

//-----------

recordings.search()
.then(results => console.log(results))
.catch(er => console.log(er));
```



## How to install

```cdm
npm i adinan-cenci/js-quick-discography
```
