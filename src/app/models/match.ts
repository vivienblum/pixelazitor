import {Item} from "./item";

export interface Match {
  id: number
  image: string
  delta: number
  collection: number
  finished: boolean
  rows_done: number
  nb_rows: number
  pattern?: number[][]
  items?: Item[]
}
