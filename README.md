# Polyfiller
Polyfiller is a simple browser script to test and load polyfills dynamically. You write your own tests and add scripts to the polyfiller. Why? To reduce bandwith and loading times by only loading polyfills that are necessary. 

# Usage
Install the script via bower (w.i.p). or download the `polyfiller.min.js` or `polyfiller.js` file.

```
bower install polyfiller
```

Include the script into your html

```html
<script src="bower_components/polyfiller/polyfiller.min.js"></script>
```

Example usage: 

```js
window.polyfiller.test(function() {
  if (!('Promise' in window)) {
    this.addPolyfill('./bower_components/promise-polyfill/promise.js');
  }

  if (!('fetch' in window)) {
    this.addPolyfill('./bower_components/fetch/fetch.js');
  }
});

window.addEventListener('polyfillsLoaded', function() {
  console.log('Done loading polyfills');
});
```
