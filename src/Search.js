const http     = require('http');
const https    = require('https');
const url      = require('url');
var DOMParser  = require('xmldom').DOMParser;
var xpath      = require('xpath');

class Search
{
    constructor()
    {
        this.offset = 0;
        this.limit  = 50;
        this.fields = { query: '' };
        this.dom    = null;
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
        return Search.makeRequest(this.getRequestUrl(), {
            headers: { 'user-agent': 'QuickDiscography/0.1.0 ( adinancenci@gmail.com )' }
        }).then( (xml) =>
        {
            var parser      = new DOMParser();
            this.dom        = parser.parseFromString(xml, 'text/xml');

            if (! this.dom.documentElement) {
                throw 'Invalid XML';
                return [];
            }

            return this.parseXml();
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

        if (nodes[0].firstChild) {
            return nodes[0].firstChild.data;
        }

        return null;
    }
}

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

    return new Promise(async function(success, fail)
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

        }).on('error', (e) => {
            fail(e.message);
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
    var query = Search.arrayToLuceneQuery(fields);
    return 'https://musicbrainz.org/ws/2/'+type+'?query='+encodeURIComponent(query)+'&offset='+offset+'&limit='+limit;
};

module.exports = Search;
