import { Source, Node } from './types';
import { readFile } from './utils';

const args = `\\(('(?:[^']|\\\\')*'|"(?:[^']|\\\\')*")\\)`;

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
    ret.push({ key: m[1].substring(1, m[1].length - 1) });
  }

  return ret;
};

export const fromFile = (
  fnName:string,
  file:string
):Source =>
  fromString(
    fnName,
    readFile(file)
  );
