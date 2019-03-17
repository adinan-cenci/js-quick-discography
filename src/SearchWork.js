var Search = require('./Search.js');

class SearchWork extends Search 
{
    wid(wid) { this.fields.wid = wid; return this;}
    work(work) { this.fields.work = work; return this;}
    workaccent(workaccent) { this.fields.workaccent = workaccent; return this;}
    arid(arid) { this.fields.arid = arid; return this;}
    artist(artist) { this.fields.artist = artist; return this;}
    artistname(artistname) { this.fields.artistname = artistname; return this;}
    type(type) { this.fields.type = type; return this;}

    id(id) { this.fields.wid = id; return this;}
    title(title) { this.fields.work = title; return this;}
    artistName(artistName) { this.fields.artistname = artistName; return this;}

    parseXml() 
    {
        var results    = [];
        var select     = this.newXpathSelect();
        var gxi        = this;

        select('//x:work-list/x:work', this.dom).forEach(function(work) 
        {
            var r = 
            {
                'title'     : gxi.getValue(work, 'x:title'), 
                'artist'    : gxi.getValue(work, 'x:artist-credit/x:name-credit/x:artist/x:name'), 
                'album'     : gxi.getValue(work, 'x:release-list/x:release/x:title')
            };

            results.push(r);
        });

        return results;
    }
}

SearchWork.prototype.type = 'work';

module.exports = SearchWork;