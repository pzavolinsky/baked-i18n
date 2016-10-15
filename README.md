baked-i18n
==========

`bake-i18n` bakes static translations at compile-time.

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

Examples, limitations and workarounds
-------------------------------------

### Only constants

The idea of baking translations at compile-time is predicated upon the fact that you can know most (if not all) the values you want to translate at compile-time. This means you can only translate constants, not expressions, nor interpolated strings. That is:

```js
_('Hello, world!'); // OK
_('Hello, ' + userName); // Unknown as compile-time (this is an expression)
_(`Hello, ${userName}`); // Unknown as compile-time (an interpolated string IS an expression)
```

Fortunately, these scenarios are trivial to workaround by using a simple `.replace`:

```js
_('Hello, $USER').replace('$USER', userName);
```

As a silver lining to this approach, you'll get more robust translations accommodating for languages where the greeting comes after `userName`:

```js
"Hello, $USER".replace('$USER', userName); // English
"$USER, salve!".replace('$USER', userName); // Italian?
```

See a full example [here](https://github.com/pzavolinsky/baked-i18n/blob/master/features/dynamic_strings.feature).

### Other translation functions (what about `gettext`?)

In all these examples I've been using `_` as the translation function. This is conveniently short and the default for `baked-i18n` but should not be confused with `underscore` or `loadash`. If you are using another translation function (e.g. `gettext` or `i18next.t`) you can specify the translation function name using the `--translate` argument as in:

```shell
./node_modules/.bin/bake-i18n --translate gettext file.js es-AR.json
```

See a full example [here](https://github.com/pzavolinsky/baked-i18n/blob/master/features/use_different_function_name.feature).

### Not only for JavaScript

While the original intent of `baked-i18n` is to operate on JavaScript files (more specifically, after bundling, but before compression), nothing prevents you from using it on any other language that has C-like function application (e.g. C, C++, C#, Java, JavaScript, etc.). That is:

```js
functionName("string argument")
// or
functionName('string argument')
```

The regular expression used to find translation matches is a bit convoluted but in essence means:
  1. Find calls to `_` (or the name specified with `--translate`)
  1. Followed by a `(`
  1. Start capture
  1. Match either a `'` or a `"`
  1. Then a string not containing the char matched in the previous step, unless it's prefixed by a `\`.
  1. Then the same delimiter char once more (either `'` or `"`)
  1. End capture
  1. Finally match a `)`

Right now you cannot change this expression, and thus languages with different function application syntax (e.g. Haskell, Ruby, etc.) might not be supported. If you are planning on using `bake-i18n` with one of these, [open an issue](https://github.com/pzavolinsky/baked-i18n/issues) and I'll expose the regex as a CLI argument.

See a full example [here](https://github.com/pzavolinsky/baked-i18n/blob/master/features/other_sources.feature).

### Artificial translation keys

Some people prefer using artificial translation keys instead of a default language, that is:

```js
// instead of:
console.log(_('Hello, World'));

// some prefer:
console.log(_('GREETING'));
```

where `en-US.json` is:

```js
{
  "GREETING": "Hello, World"
}
```

Of course, `bake-i18n` does not really care what you use as keys. This means that, as long as your keys are constant strings, you can safely choose the approach that bests suits you.

### Validate your translation files

Did you notice that your translation files get out-of-sync annoyingly fast? For almost any new feature you'll have new translations, and maybe some deprecated translations as well.

`bake-i18n` supports some command line arguments that can help keeping translations in sync. These options are:

  * `--warn-missing`: emit a warning for every key in source that is not present in a translation file.

  For example, if the source includes `_('some key')` and the translation file does not include a `some key` translation a `[WARN] Missing key: some key` will be emitted.

  * `--warn-extra`: emit a warning for every key in the translation file that is not required by the source.

  For example, if the translation file includes a `some key` translation but source does not include `_('some key')` a `[WARN] Extra key: some key` will be emitted.

  * `--warn-all` or `-w`: is an alias for `--warn-missing --warn-extra`.

  * `--fail`: exit with -1 if the process ended with warnings. This is useful to fail a build step if the translation files are out-of-sync.

### Fix your translation files

Ok, so the the translations are out-of-sync, how can we fix them? To some extent `bake-i18n` can do all the heavy lifting for you with the following options:

  * `--fix-extra`: remove all keys from the translation files that are not required by the source.
  > *NOTE*: this option will modify the locale files in place, possible removing existing translations. Make sure those files are under source control or you have a backup just in case.

  For example, if the translation file includes a `some key` translation but source does not include `_('some key')`, then `some key` will be removed from the translation file.

  * `--fix-missing`: add *TODO* translations to the translation files for every key in source that is not present in the translation file.

  For example, if the source includes `_('some key')` and the translation file does not include a `some key` translation then a `some key => '@@@@ TODO @@@@'` translation will be added to the translation file.

  * `--fix-all`: is an alias for `--fix-missing --fix-extra`.

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

  Fixing locale options:
    Note: fix options will modify the locale files in place, possible removing
    existing translations. Make sure those files are under source control or
    you have a backup before using fix options.

    --fix-all           The same as --fix-missing and --fix-extra
    --fix-extra         Remove translations from locale files that are not
                        required by the source file
    --fix-missing       Add TODO translations to locale files that are required
                        by the source file and not present in the locale file
```
