#Usage Note: the first arguments need to be a meaningful string
#
#You can just simply call Logger as
#
#Logger('foo', 'bar')
#Or, call the original function such like console.info...
#
#Logger.info('foo', 'bar')
#Logger.warn('bar', 'bar')
#Logger.log('foo', {'foo':'bar'})
###
@author: blackbing@gmail.com
###

DebugMode = do ->
  ###
  you can insert your flow to check how to decide if it is in DebugMode
  If it is, return true
  ###
  cookie = document.cookie
  if cookie.indexOf('debug') >=0
    true
  else
    false

# Console methods for browsers that do not support it
((b) ->
  c = ->
  d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",")

  while a = d.pop()
    b[a] = b[a] or c
  return
)(window.console = window.console or {})

#on production
if !DebugMode
  #if DebugMode isn't true(in production), override all the console function
  for j of console
    if typeof console[j] is 'function'
      console[j] = -> true

Logger = (s) ->
  Logger.log.apply(console, arguments)

logLevel = ['log', 'warn', 'info', 'dir', 'debug']
for i of logLevel
  lv = logLevel[i]

  Logger[lv] = do (lv) ->
    if DebugMode
      ->
        caller = arguments.callee.caller
        if window.console?
          if arguments.length<2 or typeof arguments[0] isnt 'string'
            throw new Error('the first arguments need to be a meaningful string')
          if console[lv]?
            arguments[0] = "[#{arguments[0]}]:"
            #For fixed IE console.log.apply Error
            #extend console[i].apply by Function.apply
            if !console[lv].apply?
              Function.apply.apply(console[lv], [console, arguments])
            else
              console[lv].apply(console, arguments)
          else
            throw new Error("console.#{lv} is undefined.")
          true
        else
          false
    else
      ->
        true

Logger["enabled"] = DebugMode

window.Logger = Logger
