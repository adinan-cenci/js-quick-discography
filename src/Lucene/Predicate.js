const Expression    = require('./Expression.js');
const Equal         = require('./Equal.js');
const In            = require('./In.js');
const MinMax        = require('./MinMax.js');

class Predicate 
{
    constructor() 
    {
        this.expression = new Expression();
    }

    __toString() 
    {
        return this.expression.__toString();
    }

    add(name, value, conjunction = 'AND') 
    {
        var expr;

        if (Array.isArray(value)) {
            expr = new In(name, value, conjunction);
        } else if (typeof value == 'object') {
            expr = new MinMax(name, value.min, value.max);
        } else {
            expr = new Equal(name, value);
        }

        this.expression.addExpression(expr, 'AND');
    }

    getExpressionByName(name) 
    {
        var exprs = this.getExpressionsByName(name);
        return exprs.length ? exprs[0] : null;
    }

    getExpressionsByName(name) 
    {
        return this.expression.expressions.filter(function(e) 
        {
            return typeof e == 'object' && e.expression.name == name;
        });
    }

    removeExpression(expr) 
    {
        this.expression.expressions = this.expression.expressions.filter(function(e) 
        {
            return e != expr;
        });
    }
}

module.exports = Predicate;