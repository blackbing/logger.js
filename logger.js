
/*
@author: blackbing@gmail.com
*/

(function() {
  var DebugMode, Logger, i;

  DebugMode = function() {
    /*
      you can insert your flow to check how to decide if it is in DebugMode
      If it is, return true
    */    return true;
  };

  Logger = function(s) {
    return Logger.log.apply(console, arguments);
  };

  for (i in console) {
    Logger[i] = (function(key) {
      return function() {
        var log;
        if (DebugMode() && (window.console != null)) {
          if (arguments.length < 2 || typeof arguments[0] !== 'string') {
            throw new Error('the first arguments need to be a meaningful string');
          }
          if ((typeof console !== "undefined" && console !== null) && (console[key] != null)) {
            log = console[key];
            if (!(console[key].apply != null)) {
              Function.apply.apply(console[key], [console, arguments]);
            } else {
              console[key].apply(console, arguments);
            }
          } else {
            throw new Error("console." + key + " is undefined.");
          }
          return true;
        } else {
          return false;
        }
      };
    })(i);
  }

  Logger;

  window.Logger = Logger;

}).call(this);
