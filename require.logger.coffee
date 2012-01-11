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

  ###
  @author: blackbing@gmail.com
  ###
  DebugMode = ->
    ###
    you can insert your flow to check how to decide if it is in DebugMode
    If it is, return true
    ###
    true

  if !DebugMode() and window.console?
    #if DebugMode isn't true(in production), override all the console function
    for j of console
      if typeof console[j] is 'function'
        console[j] = -> true
  Logger = (s) ->
      Logger.log.apply(console, arguments)

  for i of console
    Logger[i] = do (i) ->
      if DebugMode()
        ->
          if window.console?
            if arguments.length<2 or typeof arguments[0] isnt 'string'
              throw new Error('the first arguments need to be a meaningful string')
            if console[i]?
              arguments[0] = "[#{arguments[0]}]:"
              #For fixed IE console.log.apply Error
              #extend console[i].apply by Function.apply
              if !console[i].apply?
                Function.apply.apply(console[i], [console, arguments])
              else
                console[i].apply(console, arguments)
            else
              throw new Error("console.#{i} is undefined.")
            true
          else
            false
      else
        ->
          true

  Logger
  exprots = Logger
