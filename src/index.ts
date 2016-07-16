import { Translate } from './types';
import { extract, embed } from './parser';

export default (translate:Translate, source:string):string =>
  embed(source, extract(source).map(translate));
