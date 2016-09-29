import { readFileSync } from 'fs';
import { Source, Node } from './types';

const args = `_\(('(?:[^']|\\')*'|"(?:[^']|\\')*")\)`;

export const fromString = (
  fnName:string,
  s:string
):Source => {
  const ret:Node[] = [];

  let start = 0;

  const re = new RegExp(`${fnName}${args}`, 'g');

  while (true) {
    const m = re.exec(s);
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
  fnName:string,
  file:string
):Source =>
  fromString(
    fnName,
    readFileSync(file, { encoding: 'utf8' })
  );
