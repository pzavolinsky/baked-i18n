// Source
export type Source = Node[]

export type Node = Match | Const;

export interface Match {
  key:   string
}

export interface Const {
  text: string
}

// Translation
export type Translation = TranslatedNode[]

export type TranslatedNode = TranslatedMatch | Const;

export interface TranslatedMatch extends Match {
  text:  string
  found: boolean
}

// Type guards as misc
export const isConst = (node:Node|TranslatedNode):node is Const =>
  !(node as Match).key;

export const isMatch = <M extends Match>(node:Node|TranslatedNode):node is M =>
  !!(node as M).key;

export interface Translate {
  (m:Match):TranslatedMatch
}
