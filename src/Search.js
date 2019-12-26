const proxy         = require('./MagicMethodProxy.js');
const Predicate     = require('./Lucene/Predicate.js');
const Helper        = require('./Helper.js');
var DOMParser       = require('xmldom').DOMParser;
var xpath           = require('xpath');

/*
https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2
https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search
*/

// abstract class
class Search
{
    constructor()
    {
        this.beginning  = 0;        // pagination
        this.max        = 50;       // pagination
        this.minimum    = false;    // return minimal or more complete information
        this.query      = null;     // lucene query string
        this.predicate  = new Predicate();

        return new Proxy(this, proxy);
    }

    __call(method, args, proxy)
    {
        method = method.toLowerCase();

        if (this.fieldAliases[method]) {
            method = this.fieldAliases[method];
        }

        if (! this.fields.includes(method)) {
            throw 'Method "'+method+'" is undefined';
        }

        args.unshift(method);
        this.predicate.add.apply(this.predicate, args);

        return proxy;
    }

    //-----------------

    query(q)
    {
        this.query = q;
        return this;
    }

    complete(bool = true)
    {
        this.minimum = !bool;
        return this;
    }

    minimal(bool = true)
    {
        this.minimum = bool;
        return this;
    }

    offset(offset)
    {
        this.beginning = offset;
        return this;
    }

    limit(limit)
    {
        this.max = limit;
        return this;
    }

    //-----------------

    async search()
    {
        return Helper.makeRequest(this.getRequestUrl(), {
            headers: { 'user-agent': 'QuickDiscography/1.0.0 ( adinancenci@protonmail.com )' }
        }).then( (xml) =>
        {
            var parser      = new DOMParser();
            var dom         = parser.parseFromString(xml, 'text/xml');

            if (! dom.documentElement) {
                throw 'Invalid XML';
                return [];
            }

            return this.readXml(dom);
        });
    }

    readXml(dom)
    {
        var results    = [];
        var select     = Helper.newXpathSelect(dom.documentElement);
        var getInfo    = this.minimum ? minimalInformation.bind(this) : this.completeInformation.bind(this);

        select(this.getXpath(), dom).forEach( (entry) =>
        {
            results.push(getInfo(entry));
        });

        return results;
    }

    //-----------------

    getRequestUrl()
    {
        var query = this.getLuceneQuery();
        return Search.createRequestUrl(this.what, query, this.beginning, this.max);
    }

    getLuceneQuery()
    {
        if (this.query) {
            return this.query;
        }

        return this.predicate.__toString();
    }

    static createRequestUrl(type, query, offset = 0, limit = 50)
    {
        return 'https://musicbrainz.org/ws/2/'+type+'?query='+encodeURIComponent(query)+'&offset='+offset+'&limit='+limit;
    }
}

module.exports = Search;
