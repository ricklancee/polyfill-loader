# Polyfiller
Polyfiller is a simple browser script to test and load polyfills asynchronously. You write your own tests and add scripts to the polyfiller. 

Why this polyfiller? To reduce bandwith and loading times by only loading polyfills that are necessary. 

# Usage
Install the script via bower (not published, yet), or download the `polyfiller.min.js` or `polyfiller.js` file.

```
bower install polyfiller
```

Include the script into your html.

```html
<script src="bower_components/polyfiller/polyfiller.min.js"></script>
```

#### Basic usage

In `polyfiller.test()` you can test if API's are supported, if they are not
add them to the polyfiller to be loaded with `this.addPolyfill()` or `polyfiller.addPolyfill()`. Polyfills are loaded after `polyfiller.test()` has been executed.

```js
polyfiller.test(function() {
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

You can add scripts to the polyfiller with the `polyfiller.addPolyfill()` method, and load the script whenever you want with the `polyfiller.load()` method. You can also pass a success or fail callback to the load method, which are called when the scripts are loaded, or failed to load.

```js

if (!('Promise' in window)) {
  polyfiller.addPolyfill('./bower_components/promise-polyfill/promise.js');
}

if (!('fetch' in window)) {
  polyfiller.addPolyfill('./bower_components/fetch/fetch.js');
}

// Fire the callback when scripts are loaded.
polyfiller.load(function() {
  console.log('Done loading polyfills');
}); 

// Or listen to 'polyfillsLoaded' event to fire; both are fired.
window.addEventListener('polyfillsLoaded', function() {
  console.log('Done loading polyfills');
});
```
