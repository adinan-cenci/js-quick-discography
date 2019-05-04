# Artists in depth

[ ========== DRAFT ========== ]

The Music Brainz api allow us to search for artists based on a wide range of information and Quick Discography has a method for every parameter:

| Field        | Description                                                  | Aliases     |
| ------------ | ------------------------------------------------------------ | ----------- |
| arid         | Music Brainz's artist id                                     | id          |
| artist       | The artist's name                                            | title, name |
| artistaccent | The artist's name with accented characters retained          |             |
| alias        | Previous names, alternative names or misspellings            |             |
| comment      | the artist's disambiguation comment                          |             |
| type         | Person, Group, Orchestra, Choir, Character, Other            |             |
| gender       | Male/Female                                                  |             |
| area         | Area mainly associated with the artist                       |             |
| country      | Country mainly associated, 2 letter ISO 3166-1 code          |             |
| begin        | Person: date of birth<br />Group: date of foundation         |             |
| end          | Person: date of death<br />Group: date of dissolution        |             |
| beginarea    | Person: area of birth<br />Group: area of foundation         |             |
| endarea      | Person: area of death<br />Group: area of dissolution        |             |
| tag          | Musical genre, country, others                               | tags        |
| ipi          | [Interested Parties Information](https://musicbrainz.org/doc/IPI "(target|_blank)") Code |             |

[Music Brainz api documentation](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Artist "(target|_blank)").  
[Music Brainz definition of artist](https://musicbrainz.org/doc/Artist "(target|_blank)").



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
