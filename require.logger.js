
  /*
  Usage Note: the first arguments need to be a meaningful string
  
  You can just simply call Logger as
  
  Logger('foo', 'bar')
  Or, call the original function such like console.info...
  
  Logger.info('foo', 'bar')
  Logger.warn('bar', 'bar')
  Logger.log('foo', {'foo':'bar'})
  */

  define(function() {
    var DebugMode, Logger, exprots, i, j, logLevel, lv;
    DebugMode = (function() {
      /*
          you can insert your flow to check how to decide if it is in DebugMode
          If it is, return true
      */
      var cookie;
      cookie = document.cookie;
      if (cookie.indexOf('debug') >= 0) {
        return function() {
          return true;
        };
      } else {
        return function() {
          return false;
        };
      }
    })();
    if (!DebugMode()) {
      if (!(window.console != null)) {
        window.console = {
          log: function() {}
        };
      }
      for (j in console) {
        if (typeof console[j] === 'function') {
          console[j] = function() {
            return true;
          };
        }
      }
    }
    Logger = function(s) {
      return Logger.log.apply(console, arguments);
    };
    logLevel = ['log', 'warn', 'info', 'dir', 'debug'];
    for (i in logLevel) {
      lv = logLevel[i];
      Logger[lv] = (function(lv) {
        if (DebugMode()) {
          return function() {
            var caller;
            caller = arguments.callee.caller;
            if (window.console != null) {
              if (arguments.length < 2 || typeof arguments[0] !== 'string') {
                throw new Error('the first arguments need to be a meaningful string');
              }
              if (console[lv] != null) {
                arguments[0] = "[" + arguments[0] + "]:";
                if (!(console[lv].apply != null)) {
                  Function.apply.apply(console[lv], [console, arguments]);
                } else {
                  console[lv].apply(console, arguments);
                }
              } else {
                throw new Error("console." + lv + " is undefined.");
              }
              return true;
            } else {
              return false;
            }
          };
        } else {
          return function() {
            return true;
          };
        }
      })(lv);
    }
    Logger;
    return exprots = Logger;
  });
