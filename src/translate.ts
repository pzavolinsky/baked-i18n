import { Translation, Match, Embed } from './types';

export default (translation:Translation) =>
  ({start, end, key}:Match):Embed => ({
    start,
    end,
    key,
    text:  `"${(translation[key] || key).replace(/"/g, '\\"')}"`,
    found: !!translation[key]
  });
