MagicMethodProxy =
{
    get: function(target, prop, receiver)
    {
        // Does prop exists? Is it a method?
        if (target[prop] != undefined && typeof target[prop] == 'function') {
            // Wrap it around a function and return it
            return function(...args)
            {
                // in order to preserve the default arguments the method may have, we pass undefined
                // instead of an empty arguments object
                var value = target[prop].apply(target, (args.length ? args : undefined) );
                // it is important to return the proxy instead of the target in order to make
                // future calls to this method
                return value == target ? this : value;
            }
        }

        // Does prop exists?
        if (target[prop] != undefined) {
            return target[prop];
        }

        // Falls to __call
        return function(...args)
        {
            return target.__call(prop, args, this);
        };
    }
}

module.exports = MagicMethodProxy;
