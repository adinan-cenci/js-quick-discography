var SearchRecording = require('../src/SearchRecording.js');

s = new SearchRecording();
s.title('mirror mirror').artist('blind guardian');

s.search().then(function(results) 
{
    console.log(results);
})