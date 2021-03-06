// Generated by CoffeeScript 1.6.3
(function() {
  var Google, Q;

  Q = require('q');

  Google = (function() {
    function Google() {}

    Google.URL = 'https://maps.googleapis.com/maps/api/js?sensor=false';

    Google.KEY = null;

    Google.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';

    Google.google = null;

    Google.loading = false;

    Google.promises = [];

    Google.load = function() {
      var deferred, script, url,
        _this = this;
      deferred = Q.defer();
      if (this.google === null) {
        if (this.loading === true) {
          this.promises.push(deferred);
        } else {
          this.loading = true;
          window[this.WINDOW_CALLBACK_NAME] = function() {
            return _this._ready(deferred);
          };
          url = this.URL;
          if (this.KEY !== null) {
            url += "&key=" + this.KEY;
          }
          url += "&callback=" + this.WINDOW_CALLBACK_NAME;
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.body.appendChild(script);
        }
      } else {
        deferred.resolve(this.google);
      }
      return deferred.promise;
    };

    Google._ready = function(deferred) {
      var def, _i, _len, _ref;
      Google.loading = false;
      if (Google.google === null) {
        Google.google = window.google;
      }
      deferred.resolve(Google.google);
      _ref = Google.promises;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        def = _ref[_i];
        def.resolve(Google.google);
      }
      return Google.promises = [];
    };

    return Google;

  }).call(this);

  module.exports = Google;

}).call(this);
