const Expression    = require('./Expression.js');
const Equal         = require('./Equal.js');

class In 
{
    constructor(name, values, predicate = 'OR') 
    {
        this.name       = name;
        this.values     = values;
        this.predicate  = predicate;
    }

    __toString() 
    {
        var expr = new Expression();

        for (var v of this.values) {
            expr.addExpression(new Equal(this.name, v), this.predicate);
        }

        return '('+expr.__toString()+')';
    }
}

module.exports = In;
