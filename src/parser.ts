import { Match, Embed } from './types';

export const extract = (s:string):Match[] => {
  const findMatch = /_\('((?:[^']|\\')*)'\)/g;

  const ret:Match[] = [];

  while (true) {
    const m = findMatch.exec(s);
    if (!m) break;
    ret.push({
      start: m.index,
      end: m.index + m[0].length,
      key: m[1]
    });
  }

  return ret;
};

export const embed = (s:string, embeds:Embed[]):string => {
  let last = 0;
  const items = embeds.map(({start, end, text}) => {
    const before = last;
    last = end;
    return { before, start, text };
  });

  return items
    .map(i => `${s.substring(i.before, i.start)}${i.text}`)
    .concat(s.slice(last))
    .join('');
};
