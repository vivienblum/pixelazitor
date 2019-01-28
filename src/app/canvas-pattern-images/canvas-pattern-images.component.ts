import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core"
import { Observable } from "rxjs"
import { Item } from "../models/item"
import { environment } from "../../environments/environment"

@Component({
  selector: "app-canvas-pattern-images",
  templateUrl: "./canvas-pattern-images.component.html",
  styleUrls: ["./canvas-pattern-images.component.scss"]
})
export class CanvasPatternImagesComponent implements OnInit {
  @ViewChild("canvas") public canvas: ElementRef
  private cx: CanvasRenderingContext2D
  private _items: Item[]
  private _itemsIndexed: Item[]
  private _pattern: number[][]
  private _patternImages: Item[][]
  private _width: number = 400
  private _height: number = 400
  private _imageWidth: number = 0
  private _imageHeight: number = 0
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
      this._width = this._height = 0.8 * window.innerWidth
      this._imageWidth = this._pattern[0] ? this._pattern[0].length : 0
      this._imageHeight = this._pattern.length

      let patternImages: Item[][] = new Array(this._pattern.length)
      this._pattern.forEach((row, y) => {
        patternImages[y] = new Array(row.length)
        row.forEach((el, x) => {
          patternImages[y][x] = el >= 0 ? this._itemsIndexed[el] : null
        })
      })
      this._patternImages = patternImages
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
      this.cx = canvasEl.getContext("2d")

      canvasEl.width = this._width
      canvasEl.height = this._height

      this.drawPattern(this._patternImages)
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

  drawPattern(pattern: Item[][]) {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    //
    this.cx = canvasEl.getContext("2d")
    const elementSize = Math.round(
      this._height /
        (this._imageHeight > this._imageWidth
          ? this._imageHeight
          : this._imageWidth)
    )
    pattern.forEach((row, y) => {
      row.forEach((el, x) => {
        const image = new Image()
        image.src = el
          ? `${this.baseUrl}${el.image}`
          : "http://powersolutionksa.com/wp-content/uploads/2018/07/QUESTION-MARK.jpg"
        image.onload = () => {
          this.cx.drawImage(
            image,
            x * elementSize,
            y * elementSize + elementSize / 2,
            elementSize,
            elementSize
          )
        }
      })
    })
  }
}
