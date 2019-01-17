import { Component, OnInit, Input } from "@angular/core"
import { Observable } from "rxjs"
import { Item } from "../models/item"
import { environment } from "../../environments/environment"

@Component({
  selector: "app-canvas-pattern-images",
  templateUrl: "./canvas-pattern-images.component.html",
  styleUrls: ["./canvas-pattern-images.component.scss"]
})
export class CanvasPatternImagesComponent implements OnInit {
  private _items: Item[]
  private _itemsIndexed: Item[]
  private _pattern: number[][]
  private _patternImages: Item[][]
  baseUrl = environment.baseUrl

  @Input()
  set items(items: Item[]) {
    if (items && items != this._items) {
      this._items = items
      let itemsIndexed: Item[] = new Array(this._items.length)
      this._items.forEach(item => {
        itemsIndexed[item.id] = item
      })
      this._itemsIndexed = itemsIndexed
    }
  }

  @Input()
  set pattern(pattern: number[][]) {
    if (pattern != this._pattern) {
      this._pattern = pattern

      let patternImages: Item[][] = new Array(this._pattern.length)
      this._pattern.forEach((row, y) => {
        patternImages[y] = new Array(row.length)
        row.forEach((el, x) => {
          patternImages[y][x] = el >= 0 ? this._itemsIndexed[el] : null
        })
      })
      this._patternImages = patternImages
    }
  }

  constructor() {}

  ngOnInit() {}

  get items(): Item[] {
    return this._items
  }

  get pattern(): number[][] {
    return this._pattern
  }

  get patternImages(): Item[][] {
    return this._patternImages
  }
}
