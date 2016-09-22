import { writeFileSync } from 'fs';
import { Translation } from './types';

export const toString = (translation:Translation):string =>
  translation.map(n => n.text).join('');

export const toFile = (path:string, translation:Translation):void =>
  writeFileSync(path, toString(translation));
