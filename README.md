# windicss-runtime-dom

[![NPM version](https://img.shields.io/npm/v/windicss-runtime-dom?color=a1b858&label=)](https://www.npmjs.com/package/windicss-runtime-dom)

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
  preflight: true,
  extractInitial: true,
  mockClasses: false
}
</script>
<script src="https://unpkg.com/windicss-runtime-dom"></script>
```

Refer to [`src/index.ts`](./src/index.ts) for more details.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
