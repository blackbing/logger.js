(function() {

  /*
  * @author: blackbing@gmail.com
  * @Description:
  */

  var DebugMode, Logger;

  DebugMode = true;

  Logger = (function() {
    var i;
    Logger = function(s) {
      if (DebugMode && (window.console != null)) {
        return window.console.log.apply(console, arguments);
      }
    };
    for (i in console) {
      Logger[i] = (function(key) {
        return function() {
          if (DebugMode && (window.console != null)) {
            return console[key].apply(console, arguments);
          }
        };
      })(i);
    }
    return Logger;
  })();

  window.Logger = Logger;

}).call(this);
