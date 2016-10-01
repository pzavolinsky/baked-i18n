import { Match, TranslatedMatch, Locale } from './types';
import { readFile } from './utils';

export interface Translation {
  [index:string]:string
}

export const fromObject = (nodes:Translation):Locale => ({
  nodes,
  apply: ({ key }:Match):TranslatedMatch => ({
    key,
    text:  `"${(nodes[key] || key).replace(/"/g, '\\"')}"`,
    found: !!nodes[key]
  })
});

export const fromString = (s:string):Locale =>
  fromObject(JSON.parse(s.trim()));

export const fromFile = (file:string):Locale => {
  const content = readFile(file);
  try {
    return fromString(content);
  } catch (e) {
    console.error(`Error loading ${file}:`, e);
    throw e;
  }
};
