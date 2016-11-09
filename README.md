# Polyfill loader
Polyfill loader is a simple browser script to test and load polyfills asynchronously. You write your own tests and add scripts to the loader. 

Why this polyfill loader? To reduce bandwith and loading times by only loading polyfills that are necessary. 

# Usage
Install the script via bower, or download the `polyfill.min.js` or `polyfill.js` file.

```
bower install polyfill-loader
```

Include the script into your html.

```html
<script src="bower_components/polyfill-loader/polyfill.min.js"></script>
```

#### Basic usage

In `polyfill.test()` you can test if API's are supported, if they are not
add them to the polyfill to be loaded with `this.addPolyfill()` or `polyfill.addPolyfill()`. Polyfills are loaded after `polyfill.test()` has been executed.

```js
polyfill.test(function() {
  if (!('Promise' in window)) {
    this.addPolyfill('./bower_components/promise-polyfill/promise.js');
  }

  if (!('fetch' in window)) {
    this.addPolyfill('./bower_components/fetch/fetch.js');
  }
});

// When all polyfills have been loaded the 'polyfillsLoaded' event fires.
// Here you can initialize your app. 
window.addEventListener('polyfillsLoaded', function() {
  console.log('Done loading polyfills');
});
```

#### Adding and loading polyfills

You can add scripts to the loader with the `polyfill.addPolyfill()` method, and load the script whenever you want with the `polyfill.load()` method. You can also pass a success or fail callback to the load method, which are called when the scripts are loaded, or failed to load.

```js

if (!('Promise' in window)) {
  polyfill.addPolyfill('./bower_components/promise-polyfill/promise.js');
}

if (!('fetch' in window)) {
  polyfill.addPolyfill('./bower_components/fetch/fetch.js');
}

// Fire the callback when scripts are loaded.
polyfill.load(function() {
  console.log('Done loading polyfills');
}); 

// Or listen to 'polyfillsLoaded' event to fire; both are fired.
window.addEventListener('polyfillsLoaded', function() {
  console.log('Done loading polyfills');
});
```

### Tests
Install dependencies with `bower install`  
Run tests by opening  `test.html`
