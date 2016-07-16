import { Translate, Node, TranslatedNode, isMatch } from './types';
import { extract } from './parser';

const translateNodes = (translate:Translate, nodes:Node[]):TranslatedNode[] =>
  nodes.map(n =>
    isMatch(n)
    ? translate(n)
    : n
  );

export const translateMany = (
  translate:Translate[],
  source:string
):string[] => {
  const nodes = extract(source);
  return translate.map(t =>
    translateNodes(t, nodes).map(n => n.text).join('')
  );
};

export const translateOne = (translate:Translate, source:string):string =>
  translateMany([translate], source)[0];
