import { Translation, Match, TranslatedMatch } from './types';

export default (translation:Translation) =>
  ({ key }:Match):TranslatedMatch => ({
    key,
    text:  `"${(translation[key] || key).replace(/"/g, '\\"')}"`,
    found: !!translation[key]
  });
