import { readFileSync } from 'fs';
import { Source, Node } from './types';

export const fromString = (
  findMatch:RegExp,
  s:string
):Source => {
  const ret:Node[] = [];

  let start = 0;

  while (true) {
    const m = findMatch.exec(s);
    if (!m) {
      ret.push({ text: s.slice(start) });
      break;
    }
    if (start != m.index) ret.push({ text: s.substring(start, m.index) });
    start = m.index + m[0].length;
    ret.push({ key: m[1] });
  }

  return ret;
};

export const fromFile = (
  findMatch:RegExp,
  file:string
):Source =>
  fromString(
    findMatch,
    readFileSync(file, { encoding: 'utf8' })
  );
