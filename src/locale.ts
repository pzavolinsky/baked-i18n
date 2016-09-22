import { readFileSync } from 'fs';
import { Match, TranslatedMatch, Translate } from './types';

export interface Translation {
  [index:string]:string
}

export const fromObject = (translation:Translation):Translate =>
  ({ key }:Match):TranslatedMatch => ({
    key,
    text:  `"${(translation[key] || key).replace(/"/g, '\\"')}"`,
    found: !!translation[key]
  });

export const fromString = (s:string):Translate =>
  fromObject(JSON.parse(s.trim()));

export const fromFile = (file:string):Translate => {
  const content = readFileSync(file, { encoding: 'utf8' });
  try {
    return fromString(content);
  } catch (e) {
    console.error(`Error loading ${file}:`, e);
    throw e;
  }
};
