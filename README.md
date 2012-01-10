## What is this for?
We usually need to insert ```console.log/info/warn``` in development, however, it is terrible to switch production or development.
This function just override the original console object in Browser. So you can insert any `console` method as you want.

##Usage
You can just simply call Logger as

    Logger('foo')
    
Or, call the original function such like console.info... 

    Logger.info('foo')
    Logger.warn('bar')
    Logger.log({'foo':'bar'})

##Cheers!