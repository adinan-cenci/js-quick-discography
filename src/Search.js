const proxy    = require('./MagicMethodProxy.js');
const http     = require('http');
const https    = require('https');
const url      = require('url');
var DOMParser  = require('xmldom').DOMParser;
var xpath      = require('xpath');

/*
https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2
https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search
*/

class Search
{
    constructor()
    {
        this.offset     = 0;
        this.limit      = 50;
        this.dom        = null;
        this.minimal    = false;
        this.query      = null;

        return new Proxy(this, proxy);
    }

    __call(method, args, proxy)
    {
        method = method.toLowerCase();

        if (this.fields[method] === undefined) {
            throw 'Method "'+method+'" is undefined';
        }

        // aliases
        if (typeof this.fields[method] == 'string') {
            method = this.fields[method];
        }

        this.fields[method] = this.newClause(args);

        return proxy;
    }

    query(q)
    {
        this.query = q;
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

    minimal(bool = true)
    {
        this.minimal = bool;
        return this;
    }

    complete(bool = true)
    {
        this.minimal = !bool;
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

    parseXml()
    {
        var results    = [];
        var select     = this.newXpathSelect();
        var getInfo    = this.minimal ? this.minimalInformation.bind(this) : this.completeInformation.bind(this);

        select(this.getXpath(), this.dom).forEach( (entry) =>
        {
            results.push(getInfo(entry));
        });

        return results;
    }

    getRequestUrl()
    {
        var query = this.getLuceneQuery();
        return Search.createRequestUrl(this.what, query, this.offset, this.limit);
    }

    newXpathSelect()
    {
        var defaultNsUri = this.dom.documentElement.lookupNamespaceURI('');
        return xpath.useNamespaces({'x': defaultNsUri});
    }

    getNodes(node, xpath)
    {
        var select = this.newXpathSelect();
        return select(xpath, node);
    }

    getElementValue(node, xpath)
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

    getElementsValues(node, xpath)
    {
        var nodes = this.getNodes(node, xpath);

        if (! nodes.length) {
            return null; // in JS empty arrays evaluate to true
        }

        var values = [];

        for (let x = 0; x < nodes.length; x++) {
            values.push(nodes[x].firstChild.data);
        }

        return values;
    }

    getAttrValue(node, attr)
    {
        var nodeAttr = node.getAttributeNode(attr);

        if (! nodeAttr) {
            return null;
        }

        return nodeAttr.nodeValue;
    }

    newClause(args)
    {
        if (Array.isArray(args[0])) {
            return {
                value       : args[0],
                conjunction : (args[1] ? args[1] : 'AND')
            };
        }

        if (this.isObject(args[0])) {
            return {
                value: args[0],
            };
        }

        return {
            value: args[0]
        };
    }

    getLuceneQuery()
    {
        if (this.query) {
            return this.query;
        }

        var q = [];

        for (let pr in this.fields) {
            if (this.fields[pr] == null || typeof this.fields[pr] == 'string') {
                continue;
            }

            q.push(this.objectToLuceneClause(pr, this.fields[pr]));
        }

        return q.join(' AND ');
    }

    objectToLuceneClause(field, object)
    {
        if (Array.isArray(object.value)) {
            var ar = [];

            for (let x of object.value) {
                ar.push(this.luceneField(field, x));
            }

            return '('+ar.join(' '+object.conjunction+' ')+')';
        }

        if (this.isObject(object.value)) {
            return field+':['+object.value.min+' TO '+object.value.max+']';
        }

        return this.luceneField(field, object.value);
    }

    luceneField(field, value)
    {
        if (value.indexOf('-') == 0) {
            return '-'+field+':"'+value.substr(1, value.length)+'"';
        }

        return field+':"'+value+'"';
    }

    isObject(data)
    {
        return typeof data == 'object';
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

Search.createRequestUrl = function(type, query, offset = 0, limit = 50)
{
    return 'https://musicbrainz.org/ws/2/'+type+'?query='+encodeURIComponent(query)+'&offset='+offset+'&limit='+limit;
};

Search.parseInt = function(str)
{
    if (str === null || str === undefined) {
        return 0;
    }

    return parseInt(str.replace(/[^0-9]/g, ''));
}

module.exports = Search;
