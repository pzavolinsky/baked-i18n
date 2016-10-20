import { Match, TranslatedMatch, Locale } from './types';
import { readFile } from './utils';
import { writeFileSync } from 'fs';

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

export const toFile = (file:string, locale:Locale):void =>
  writeFileSync(file, JSON.stringify(locale.nodes, undefined, 2));

const getKeys = (locale:Locale, extra:string[] = []):string[] => {
  const keys = Object.keys(locale.nodes).concat(extra);
  keys.sort();
  return keys;
};

export const removeExtra = (extra:string[]) => (locale:Locale):Locale =>
  extra.length
  ? fromObject(
      getKeys(locale)
      .filter(k => extra.indexOf(k) == -1)
      .reduce(
        (o, k) => Object.assign(o, {
          [k]: locale.nodes[k]
        }) as Translation,
        {} as Translation
      )
    )
  : locale;

export const addMissing = (missing:string[]) => (locale:Locale):Locale =>
  missing.length
  ? fromObject(
      getKeys(locale, missing)
      .reduce(
        (o, k) => Object.assign(o, {
          [k]: locale.nodes[k] || '@@@@ TODO @@@@'
        }) as Translation,
        {} as Translation
      )
    )
  : locale;
