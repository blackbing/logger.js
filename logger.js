
/*
@author: blackbing@gmail.com
@Description:
*/

(function() {
  var DebugMode, Logger;

  DebugMode = function() {
    /*
      you can insert your flow to check how to decide if it is in DebugMode
      If it is, return true
    */    return true;
  };

  Logger = (function() {
    var i;
    Logger = function(s) {
      return Logger.log.apply(console, arguments);
    };
    for (i in console) {
      Logger[i] = (function(key) {
        return function() {
          if (DebugMode() && (window.console != null)) {
            if (arguments.length < 2 || typeof arguments[0] !== 'string') {
              throw new Error('the first arguments need to be a meaningful string');
            }
            console[key].apply(console, arguments);
            return true;
          } else {
            return false;
          }
        };
      })(i);
    }
    return Logger;
  })();

  window.Logger = Logger;

}).call(this);
