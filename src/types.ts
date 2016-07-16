export interface Match {
  key:   string
}

export interface TranslatedMatch extends Match {
  text:  string
  found: boolean
}

export interface Const {
  text: string
}

export type Node = Match | Const;

export type TranslatedNode = TranslatedMatch | Const;

export const isConst = (node:Node|TranslatedNode):node is Const =>
  !(node as Match).key;

export const isMatch = <M extends Match>(node:Node|TranslatedNode):node is M =>
  !!(node as M).key;

export interface Translation {
  [index:string]:string
}

export interface Translate {
  (m:Match):TranslatedMatch
}
