class Expression 
{
    constructor(initial = null) 
    {
        this.expressions = [];
        if (initial) {
            this.addExpression(initial, null);
        }
    }

    addExpression(expression, conjunction = 'AND') 
    {
        conjunction = this.expressions.length ? conjunction : null;
        this.expressions.push({conjunction, expression});
        return this;
    }

    __toString() 
    {
        var str = '';
        var conjunction;
        var expression;

        for (var obj of this.expressions) {
            conjunction = obj.conjunction;
            expression  = obj.expression.__toString ? obj.expression.__toString() : obj.expression;

            str += ' '+(conjunction != null ? conjunction + ' ' : '') + expression;
        }

        str = str.trim(' ');

        return str;
    }
}

module.exports = Expression;