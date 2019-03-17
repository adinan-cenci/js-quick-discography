const http     = require('http');
const https    = require('https');
const url      = require('url');
var DOMParser  = require('xmldom').DOMParser;
var xpath      = require('xpath');

class Search 
{
    constructor() 
    {
        this.dom = null;
    }

    query(q) 
    {
        this.fields.query = q;
        return this;
    }

    offset(offset) 
    {
        this.offset = offset;
        return this;
    }

    limit(limit) 
    {
        this.limit = limit;
        return this;
    }

    async search() 
    {
        var gxi = this;
        return Search.makeRequest(this.getRequestUrl(), {
            headers: {
                'user-agent': 'JustTestingTheApi/0.1.0 ( adinancenci@gmail.com )'
            }
        }).then(function(xml) 
        {
            var parser      = new DOMParser();
            gxi.dom         = parser.parseFromString(xml, 'text/xml');
            return gxi.parseXml();
        });
    }

    getRequestUrl() 
    {
        return Search.createRequestUrl(this.type, this.fields, this.offset, this.limit);
    }

    newXpathSelect() 
    {
        var defaultNsUri  = this.dom.documentElement.lookupNamespaceURI('');
        return xpath.useNamespaces({'x': defaultNsUri});
    }

    getNodes(node, xpath) 
    {
        var select = this.newXpathSelect();
        return select(xpath, node);
    }

    getValue(node, xpath) 
    {
        var nodes = this.getNodes(node, xpath);
        if (! nodes.length) {
            return null;
        }

        return nodes[0].firstChild.data;
    }
}

Search.prototype.offset   = 0;
Search.prototype.limit    = 50;
Search.prototype.fields   = 
{
    query: ''
};

Search.makeRequest = async function(address, options = {}) 
{
    var myUrl     = url.parse(address);
    var protocol  = myUrl.protocol == 'https:' ? https : http;

    var defaultOptions = 
    {
        hostname  : myUrl.hostname, 
        port      : myUrl.port,
        path      : myUrl.path,
        agent     : false  // Create a new agent just for this one request
    };    

    var options = {...defaultOptions, ...options};

    return new Promise(function(success, fail)
    {
        protocol.get(options, (res) => 
        {
            if (res.statusCode !== 200) {
                fail('Error: ' + res.statusCode);
            }
          
            res.setEncoding('utf8');
            
            let rawData = '';

            res.on('data', function(chunk) 
            {
                rawData += chunk;
            });

            res.on('end', function() 
            {
                success(rawData);
            });
        });
    });
};

Search.arrayToLuceneQuery = function(array) 
{
    if (array.query.length) {
        return array.query;
    }

    var a = [];
    for(key in array) {
        if (! array[key].length) { continue; }
        a.push(key+':"'+array[key]+'"');
    }

    return a.join(' AND ');
};

Search.createRequestUrl = function(type, fields, offset = 0, limit = 50) 
{
    var query  = Search.arrayToLuceneQuery(fields);
    return 'https://musicbrainz.org/ws/2/'+type+'?query='+encodeURIComponent(query)+'&offset='+offset+'&limit='+limit;
};

module.exports = Search;