import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core"
import { Observable } from "rxjs"

@Component({
  selector: "app-canvas-pattern",
  templateUrl: "./canvas-pattern.component.html",
  styleUrls: ["./canvas-pattern.component.scss"]
})
export class CanvasPatternComponent implements OnInit {
  @ViewChild("canvas") public canvas: ElementRef
  private _pattern: number[][]
  private _imageWidth: number = 0
  private _imageHeight: number = 0
  private _width: number = 400
  private _height: number = 400
  private cx: CanvasRenderingContext2D

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
    this._width = this._height = 0.7 * window.innerWidth
    this._imageWidth = this._pattern[0] ? this._pattern[0].length : 0
    this._imageHeight = this._pattern.length
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement

    this.cx = canvasEl.getContext("2d")

    canvasEl.width = this._width
    canvasEl.height = this._height

    this.drawPattern(this._pattern)
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  drawPattern(pattern: number[][]) {
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
        const msg = el ? el.toString() : "?"
        this.cx.fillText(
          msg,
          x * elementSize,
          y * elementSize + elementSize / 2,
          elementSize
        )
      })
    })
  }

  get pattern(): number[][] {
    return this._pattern
  }
}
