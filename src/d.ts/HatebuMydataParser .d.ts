declare module 'hatebu-mydata-parser' {
  export type HatebuData = {
    title: string
    comment: string
    url: string
    date: Date
  }
  export function parse (data: string): HatebuData[]
}
