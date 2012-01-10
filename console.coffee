###
* @author: blackbing@gmail.com
* @Description:
###
DebugMode = true
Logger = (->
  Logger = (s) ->
    if DebugMode and window.console?
      window.console.log.apply(console, arguments)

  for i of console
    Logger[i] = ((key) ->
      ->
        if DebugMode and window.console?
          console[key].apply console, arguments
    )(i)
  Logger
)()

window.Logger = Logger
