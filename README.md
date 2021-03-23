# windicss-runtime-dom

[![NPM version](https://img.shields.io/npm/v/windicss-runtime-dom?color=0ea5e9&label=)](https://www.npmjs.com/package/windicss-runtime-dom)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/windicss-runtime-dom?color=1180b2&label=)](https://bundlephobia.com/result?p=windicss-runtime-dom)

> 🧪 Expiremental

Enables [Windi CSS](https://github.com/windicss/windicss) for **any site** with one-line code **without** any build tools - Windi CSS on the browser runtime.

```html
<script src="https://unpkg.com/windicss-runtime-dom"></script>
```

And start playing!

Idea credit to [@alexanderniebuhr](https://github.com/alexanderniebuhr) 🙌

## Configurations

```js
<script>
window.windicssRuntimeOptions = {
  // enabled preflight
  preflight: true,
  // scan the entire dom tree to infer the classnames on page loaded
  extractInitial: true,
  // generate mock classes for browser to do the auto-completeion 
  mockClasses: false,
  // the windi config you are used to put in `windi.config.js`
  config: {}
}
</script>
<script src="https://unpkg.com/windicss-runtime-dom"></script>
```

Refer to [`src/index.ts`](./src/index.ts) for more details.

## Notes

This is an **Expiremental** project what ships the Windi CSS compiler to the client side. It utilizes [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to watch the changes for the entire dom, and injects the style to the `<head>`. This might have certain impact the the client side performance, please consider using build tools instead of this if the production performance is something you need to consider. That said, it still works great and out-of-box for the senerios that you want to focus more on content and styling without complex setups.

And for a faster/lighter CSS-in-JS solution, you may want to check out [twind](https://github.com/tw-in-js/twind).

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
