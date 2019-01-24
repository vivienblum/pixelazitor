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
  static WIDTH = 400
  static HEIGHT = 400
  private cx: CanvasRenderingContext2D

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
    this._imageWidth = this._pattern[0] ? this._pattern[0].length : 0
    this._imageHeight = this._pattern.length
    console.log(this._imageWidth, this._imageHeight)
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    //
    this.cx = canvasEl.getContext("2d")

    canvasEl.width = CanvasPatternComponent.WIDTH
    canvasEl.height = CanvasPatternComponent.HEIGHT

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
      CanvasPatternComponent.HEIGHT /
        (this._imageHeight > this._imageWidth
          ? this._imageHeight
          : this._imageWidth)
    )
    pattern.forEach((row, y) => {
      row.forEach((el, x) => {
        this.cx.fillText(
          el,
          x * elementSize,
          y * elementSize + elementSize / 2,
          elementSize,
          elementSize
        )
      })
    })
  }

  get pattern(): number[][] {
    return this._pattern
  }
}
