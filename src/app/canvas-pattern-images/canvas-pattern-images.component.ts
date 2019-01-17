import { Component, OnInit, Input } from "@angular/core"
import { Observable } from "rxjs"
import { Item } from "../models/item"

@Component({
  selector: "app-canvas-pattern-images",
  templateUrl: "./canvas-pattern-images.component.html",
  styleUrls: ["./canvas-pattern-images.component.scss"]
})
export class CanvasPatternImagesComponent implements OnInit {
  private _items: Observable<Item[]>
  private _pattern: number[][]

  @Input()
  set items(items: Observable<Item[]>) {
    this._items = items
  }

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
    console.table(this._pattern)
  }

  constructor() {}

  ngOnInit() {}

  get items(): Observable<Item[]> {
    return this._items
  }

  get pattern(): number[][] {
    return this._pattern
  }
}
