###
@author: blackbing@gmail.com
@Description:
###
DebugMode = ->
  ###
  you can insert your flow to check how to decide if it is in DebugMode
  If it is, return true
  ###
  true
Logger = (->
  Logger = (s) ->
      Logger.log.apply(console, arguments)

  for i of console
    Logger[i] = ((key) ->
      ->
        if DebugMode() and window.console?
          if (arguments.length<2 or typeof arguments[0] isnt 'string')
            throw new Error('the first arguments need to be a meaningful string')

          console[key].apply console, arguments
          true
        else
          false
    )(i)
  Logger
)()

window.Logger = Logger
