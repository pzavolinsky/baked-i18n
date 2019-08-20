import { Source, Node } from './types';
import { readFile } from './utils';

// tslint:disable-next-line:max-line-length
const args = `\\(('(?:[^']|\\\\')*'|\\\\"(?:[^"]|\\\\\\\\")*\\\\"|"(?:[^"]|\\\\")*")\\)`;

export const fromString = (
  fnName:string,
  s:string
):Source => {
  const ret:Node[] = [];
  const re = new RegExp(`(?:[^a-zA-Z0-9_])(${fnName}${args})`, 'g');

  let start = 0;

  while (true) {
    const m = re.exec(s);

    if (!m) {
      ret.push({ text: s.slice(start) });
      break;
    }

    const index = m.index + m[0].indexOf(fnName);

    if (start != index) ret.push({ text: s.substring(start, index) });
    start = index + m[1].length;

    ret.push({ key: getKeyFromMatched(m[2]) });
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

const getKeyFromMatched = (matched:string) => {
  const cleanText = matched.replace(/\\+/g, '');
  return cleanText.substring(1, cleanText.length - 1);
};
