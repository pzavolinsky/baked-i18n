export interface Match {
  start: number
  end:   number
  key:   string
}

export interface Embed extends Match {
  text:  string
  found: boolean
}

export interface Translation {
  [index:string]:string
}

export interface Translate {
  (m:Match):Embed
}
