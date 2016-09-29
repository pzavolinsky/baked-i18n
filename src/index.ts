import { Source, Locale, BakedResult, Match, isMatch } from './types';
import { makeSet } from './utils';
import { Options, getSource, getLocales } from './options';
import { translate } from './translate';
import { toString } from './output';

interface SourceKeys {
  [key:string]:boolean
}

const processLocale = (source:Source, sourceKeys:SourceKeys) =>
  (locale:Locale):BakedResult => {
    const nodes = translate(locale, source);
    const localeNodes = locale.nodes;
    return {
      nodes,
      text: toString(nodes),
      missing: nodes
        .filter(n => isMatch(n) && !n.found)
        .map(n => (n as Match).key),
      extra: Object.keys(localeNodes).filter(k => !sourceKeys[k])
    };
  };

export const advancedBake = (options:Options):BakedResult[] => {
  const source = getSource(options);
  const locales = getLocales(options);
  const sourceKeys = makeSet(
    source
    .filter(isMatch)
    .map(n => (n as Match).key)
  );
  return locales.map(processLocale(source, sourceKeys));
};

// Maps each locale in options into the translated version of source
export default (options:Options):string[] =>
  advancedBake(options)
  .map(r => r.text);
