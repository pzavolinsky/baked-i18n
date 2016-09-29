baked-i18n
==========

`bake-i18n` bakes static translations into at compile-time.

Given a `source` file, and one or more JSON translations, `bake-i18n` replaces instances of a translation function in `source` with the translations from every JSON file, producing translated versions of `source`.

Installation
------------

```
npm install --save-dev baked-i18n
```

Usage
-----

```shell
./node_modules/.bin/bake-i18n path/to/source path/to/locale.json ...
```

or:

```ts
import bake from 'baked-i18n';
const translations = bake({
  sourcePath: 'path/to/source',
  localePaths: ['path/to/en-US.json', 'path/to/es-AR.json']
});

// translations = [
//   '...', // ... is 'source' translated to en-US
//   '...'  // ... is 'source' translated to es-AR
// ]
```

For example, given a `file.js`:

```js
console.log(_('Hello, World'));
```

And `es-AR.json`:

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

CLI Options
-----------

```shell
$ ./bin/bake-i18n -h
```

```

  Usage: bake-i18n [options] source locales...

    source:    the source file to translate

    locales:   one or more JSON translation files

  Input Options:
    --culture REGEX     The JS regex that will be used to extract the culture
                        information from the locale path. The first capture of
                        this regex should match the culture.
                          (defaults to: .*([a-z]{2}-[A-Z]{2}).*.json$)

    --translate NAME    The name of the translation function used in source.
                          (defaults to '_')

  Output Options:
    --out DIR, -o       Output directory (defaults to source's directory)
    --silent, -s        Do not print the generated file names unless they have
                        warnings
    --fail              Exit with -1 if the process ended with warnings
    --warn-all, -w      The same as --warn-missing and --warn-extra
    --warn-extra        Warn when the locale file contains unused translations
    --warn-missing      Warn when a translation required by source is missing in
                        the locale file
```
