const http          = require('http');
const https         = require('https');
const url           = require('url');
var DOMParser       = require('xmldom').DOMParser;
var xpath           = require('xpath');

class Helper 
{
    static async makeRequest(address, options = {})
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

            }).on('error', (e) => 
            {
                fail(e.message);
            });
        });
    }

    //-----------------

    static newXpathSelect(documentElement)
    {
        var defaultNsUri = documentElement.lookupNamespaceURI('');
        return xpath.useNamespaces({'x': defaultNsUri});
    }

    static getNodes(node, xpath)
    {
        var select = Helper.newXpathSelect(node.ownerDocument.documentElement);
        return select(xpath, node);
    }

    static getElementValue(node, xpath)
    {
        var nodes = Helper.getNodes(node, xpath);

        if (! nodes.length) {
            return null;
        }

        if (nodes[0].firstChild) {
            return nodes[0].firstChild.data;
        }

        return null;
    }

    static getElementsValues(node, xpath)
    {
        var nodes = Helper.getNodes(node, xpath);

        if (! nodes.length) {
            return null; // in JS empty arrays evaluate to true
        }

        var values = [];

        for (let x = 0; x < nodes.length; x++) {
            values.push(nodes[x].firstChild.data);
        }

        return values;
    }

    static getAttrValue(node, attr)
    {
        var nodeAttr = node.getAttributeNode(attr);

        if (! nodeAttr) {
            return null;
        }

        return nodeAttr.nodeValue;
    }

    //-----------------

    static parseInt(str)
    {
        if (str === null || str === undefined) {
            return 0;
        }

        return parseInt(str.replace(/[^0-9]/g, ''));
    }
}

module.exports = Helper;
