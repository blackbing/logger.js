## What is this for?
We usually need to insert ```console.log/info/warn``` in development, however, it is terrible to switch production or development.
This function just override the original console object in Browser. So you can insert any `console` method as you want.

##Usage ```Note: the first arguments need to be a meaningful string```

You can just simply call Logger as

    Logger('foo', 'bar')
    
Or, call the original function such like console.info... 

    Logger.info('foo', 'bar')
    Logger.warn('bar', 'bar')
    Logger.log('foo', {'foo':'bar'})

##Cheers!