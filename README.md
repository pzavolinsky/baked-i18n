baked-i18n
==========

`bake-i18n` bakes static translations at compile-time. Given a `source` file, and one or more JSON translations, `bake-i18n` replaces instances of a translation function in `source` with the translations from every JSON file, producing translated versions of `source`.

Installation
------------

```
npm install --save-dev baked-i18n
```

Usage
-----

```shell
./node_modules/.bin/bake-i18n path/to/file.js path/to/locale.json ...
```

or:

```ts
import bake from 'baked-i18n';
const translations = bake({
  sourcePath: 'path/to/file.js',
  localePaths: ['path/to/en-US.json', 'path/to/es-AR.json']
});

// translations = [
//   '...', // ... is 'file.js' translated to en-US
//   '...'  // ... is 'file.js' translated to es-AR
// ]
```

For example, given a `file.js`:

```js
console.log(_('Hello, World'));
```

And a `es-AR.json`:

```js
{
  "Hello, World": "Hola, Mundo"
}
```

Running:

```shell
./node_modules/.bin/bake-i18n file.js es-AR.json ...
```

Generates `file-es-AR.js`:

```js
console.log("Hola, Mundo");
```
