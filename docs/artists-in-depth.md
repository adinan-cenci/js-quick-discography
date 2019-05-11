# Artists in depth

The Music Brainz api accepts [lucene queries](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) and allow us to make searches based on a wide range of information. To help you build your query, Quick Discography offers a method for every parameter:

| Parameter    | Description                                                  | Aliases     |
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
| ipi          | [Interested Parties Information](https://musicbrainz.org/doc/IPI) Code |             |

For more details read:

- [Music Brainz's docs on artists](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search#Artist).  
- [Music Brainz's definition of artist](https://musicbrainz.org/doc/Artist).

## How the methods work?
All the methods listed above work the same, you must inform either:

- A term
- A list of terms
- A range

What we mean:
```js
// Must contain "metal" in the name
artist.name('metal')

// Must contain "metal" AND "kings" in the name
artist.name(['metal', 'kings'])

// Must contain "metal" OR "kings" in the name
artist.name(['metal', 'kings'], 'OR')

// Countries: from Argentina to Zimbabwe
artist.country({min: 'AF', max: 'ZW'})
```

## Examples

```js
// Now, let's say we want to find Power Metal...
artists.tag('Power metal')

// ...bands...
artists.type('Group')

// ...in Sweden, Norway, Finland and Germany...
artists.country(['SE', 'NO', 'FI', 'DE'], 'OR')

// ...founded between 1970 and 1990
artists.begin({min: 1970, max: 1990})

artists.search().then(results => console.log(results))
```

### Do it yourself
Or maybe you rather write your own [lucene query](https://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#package_description) instead of using our helping methods?

```js
artists.query('tag:"Power metal" AND type:"Group" AND (country:"SE" OR country:"NO" OR country:"FI" OR country:"DE") AND begin:[1970 TO 1990]')

artists.search().then(results => console.log(results))
```

### What it will return

It will return an array of objects:

```json
[ 
    {
        arid: '563ace2c-6e94-4b64-b544-40099a96b86d',
        name: 'Brainstorm',
        type: 'Group',
        gender: null,
        area: 'Germany',
        country: 'DE',
        ipi: null,
        begin: '1989',
        end: '1989',
        beginarea: 'Heidenheim an der Brenz',
        endarea: null,
        tags: [ 'power metal' ],
        alias: null 
    },
    { 
        arid: '8766cdd6-066c-4b14-ba53-c7958e613bad',
        name: 'Gamma Ray',
        ...
    },
    {
        arid: 'd1075cad-33e3-496b-91b0-d4670aabf4f8',
        name: 'Wizard',
        ...
    },
    {
        arid: '5f72c22e-8b66-4df7-9566-e3b4a04ec9db',
        name: 'Conception',
        ...
    },
    ...
]
```

