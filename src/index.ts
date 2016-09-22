import { Translate, Source } from './types';
import { Options, getSource, getLocales } from './options';
import { translate } from './translate';
import { toString } from './output';

const tx = (source:Source) => (t:Translate) => toString(translate(t, source));

// Maps each locale in options into the translated version of source
export default (options:Options):string[] =>
  getLocales(options)
  .map(tx(getSource(options)));
