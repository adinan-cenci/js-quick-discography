class Equal 
{
    constructor(name, value) 
    {
        this.name   = name;
        this.value  = value;
    }

    __toString() 
    {
    	var value 		= this.value;
    	var negation 	= false;
    	if (this.value[0] == '-') {
    		negation 	= true;
    		value 		= value.substr(1);
    	}

        return (negation ? '-' : '')+this.name+':"'+value+'"';
    }
}

module.exports = Equal;