import { Source, Translation, Locale, isMatch } from './types';

export const translate = (locale:Locale, source:Source):Translation =>
  source.map(n =>
    isMatch(n)
    ? locale.apply(n)
    : n
  );
