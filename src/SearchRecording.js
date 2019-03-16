var Search = require('./Search.js').Search;

class SearchRecording extends Search 
{
    rid(rid) { this.fields.rid = rid; return this;}
    recording(recording) { this.fields.recording = recording; return this;}
    recordingaccent(recordingaccent) { this.fields.recordingaccent = recordingaccent; return this;}
    artist(artist) { this.fields.artist = artist; return this;}
    arid(arid) { this.fields.arid = arid; return this;}
    artistName(artistName) { this.fields.artistname = artistName; return this;}
    reid(reid) { this.fields.reid = reid; return this;}
    release(release) { this.fields.release = release; return this;}

    id(id) { this.fields.rid = id; return this;}
    title(title) { this.fields.recording = title; return this;}
    releaseId(releaseId) { this.fields.reid = releaseId; return this;}

    parseXml() 
    {
        var results    = [];
        var select     = this.newXpathSelect();
        var gxi        = this;

        select('//x:recording-list/x:recording', this.dom).forEach(function(recording) 
        {
            var r = 
            {
                'title'     : gxi.getValue(recording, 'x:title'), 
                'artist'    : gxi.getValue(recording, 'x:artist-credit/x:name-credit/x:artist/x:name'), 
                'album'     : gxi.getValue(recording, 'x:release-list/x:release/x:title'), 
            };

            results.push(r);
        });

        return results;
    }
}

SearchRecording.prototype.type = 'recording';

module.exports.SearchRecording = SearchRecording;