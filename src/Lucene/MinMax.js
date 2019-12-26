class MinMax 
{
    constructor(name, min, max) 
    {
        this.name   = name;
        this.min    = min;
        this.max    = max;
    }

    __toString() 
    {
        var min = isNaN(this.min) ? '"'+this.min+'"' : this.min;
        var max = isNaN(this.max) ? '"'+this.max+'"' : this.max;

        return this.name+':['+min+' TO '+max+']';
    }
}

module.exports = MinMax;