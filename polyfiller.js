'use strict';

window.polyfiller = (function () {
  var polyFillsLoadedEvent = new CustomEvent('polyfillsLoaded', {
    bubbles: true
  });

  var polyfillsLoaded = false;
  var toBeLoadedPolyfills = [];

  var loadScripts = function loadScripts(urls, succesCB, failCB) {
    var count = urls.length;
    var failed = false;

    if (urls.length == 0)
      return succesCB();

    urls.forEach(function (url) {
      var script = document.createElement('script');

      script.onload = function () {
        if (failed)
          return;

        if (! count--)
          succesCB();
      };

      script.onerror = function () {
        if (failed)
          return;

        failCB();

        failed = true;
      };

      script.src = url;
      document.head.insertBefore(script, document.head.firstChild);
    });
  };

  var load = function(succesCB, failCB) {
    if (polyfillsLoaded) {
      return;
    }

    polyfillsLoaded = true;

    loadScripts(toBeLoadedPolyfills, function () {
      if (succesCB) {
        succesCB();
      }

      requestAnimationFrame(function () {
        document.dispatchEvent(polyFillsLoadedEvent);
      });
    }, function () {
      polyfillsLoaded = false;

      if (failCB) {
        failCB();
      }

      throw new Error('Failed to load required polyfills');
    });
  };

  var addPolyfill = function(url) {
    if (Object.prototype.toString.call(url) === '[object Array]') {
      url.forEach(function(url) {
        toBeLoadedPolyfills.push(url);
      });
      return;
    }
    toBeLoadedPolyfills.push(url);
  };

  return {
    load: load,
    addPolyfill: addPolyfill,
    test: function(tests) {
      tests.call({addPolyfill: addPolyfill});
      load();
    }
  };
})();
