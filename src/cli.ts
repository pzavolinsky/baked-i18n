import { readFileSync } from 'fs';
import translate from './translate';
import processString from './index';

const fileName = process.argv.slice(1)[1];

const template = readFileSync(fileName, { encoding: 'utf8' });

console.log(
  processString(translate({'select':'pipi'}), template)
);
