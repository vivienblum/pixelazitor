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
  private _items: Observable<Item[]>
  private _pattern: number[][]
  baseUrl = environment.baseUrl

  @Input()
  set items(items: Observable<Item[]>) {
    this._items = items
  }

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
  }

  constructor() {}

  ngOnInit() {}

  get items(): Observable<Item[]> {
    return this._items
  }

  get pattern(): number[][] {
    return this._pattern
  }

  get patternImages(): string[][] {
    let itemsIndexed: number[] = new Array(this._items.length)
    this._items.forEach(item => {
      itemsIndexed[item.id] = item
    })

    let patternImages: string[][] = new Array(this._pattern.length)
    this._pattern.forEach((row, y) => {
      patternImages[y] = new Array(row.length)
      row.forEach((el, x) => {
        this._items.filter(item => {
          return (item.id = el)
        })

        patternImages[y][x] = el >= 0 ? itemsIndexed[el] : null
      })
    })
    console.table(patternImages)
    return patternImages
  }
}
