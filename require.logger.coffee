###
Usage Note: the first arguments need to be a meaningful string

You can just simply call Logger as

Logger('foo', 'bar')
Or, call the original function such like console.info...

Logger.info('foo', 'bar')
Logger.warn('bar', 'bar')
Logger.log('foo', {'foo':'bar'})
###
define ->
  DebugMode = ->
    ###
    you can insert your flow to check how to decide if it is in DebugMode
    If it is, return true
    ###
    true
  Logger = (s) ->
      Logger.log.apply(console, arguments)

  for i of console
    Logger[i] = ((key) ->
      ->
        if DebugMode() and window.console?
          if (arguments.length<2 or typeof arguments[0] isnt 'string')
            throw new Error('the first arguments need to be a meaningful string')
          if(console? and console[key]? )
            log = console[key]
            #For fixed IE console.log.apply Error
            #extend console[key].apply by Function.apply
            if( !console[key].apply? )
              Function.apply.apply(console[key], [console, arguments])
            else
              console[key].apply console, arguments
          else
            throw new Error("console.#{key} is undefined.")
          true
        else
          false
    )(i)
  Logger

  exprots = Logger
