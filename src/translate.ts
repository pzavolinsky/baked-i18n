import { Source, Translation, Translate, isMatch } from './types';

export const translate = (translate:Translate, source:Source):Translation =>
  source.map(n =>
    isMatch(n)
    ? translate(n)
    : n
  );
