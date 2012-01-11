
/*
@author: blackbing@gmail.com
*/

(function() {
  var DebugMode, Logger, i, j;

  DebugMode = function() {
    /*
      you can insert your flow to check how to decide if it is in DebugMode
      If it is, return true
    */    return true;
  };

  if (!DebugMode() && (window.console != null)) {
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

  for (i in console) {
    Logger[i] = (function(i) {
      if (DebugMode()) {
        return function() {
          if (window.console != null) {
            if (arguments.length < 2 || typeof arguments[0] !== 'string') {
              throw new Error('the first arguments need to be a meaningful string');
            }
            if (console[i] != null) {
              arguments[0] = "[" + arguments[0] + "]:";
              if (!(console[i].apply != null)) {
                Function.apply.apply(console[i], [console, arguments]);
              } else {
                console[i].apply(console, arguments);
              }
            } else {
              throw new Error("console." + i + " is undefined.");
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
    })(i);
  }

  Logger;

  window.Logger = Logger;

}).call(this);
