import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core"

@Component({
  selector: "app-canvas-pixelate",
  templateUrl: "./canvas-pixelate.component.html",
  styles: ["./canvas-pixelate.component.scss"]
})
export class CanvasPixelateComponent implements OnInit {
  @ViewChild("canvas") public canvas: ElementRef
  private _amount: number
  private _image: HTMLImageElement
  // @Input() amount: number
  @Input()
  set amount(amount: number) {
    if (amount && this._amount !== amount) {
      this._amount = amount
      if (this.cx) {
        this.pixelateImage(this._image, this._amount)
      }
    }
  }

  private cx: CanvasRenderingContext2D
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    // image
    this._image = new Image()
    this._image.src =
      "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg"
    // canvas
    this.cx = canvasEl.getContext("2d")

    this._image.onload = function() {
      canvasEl.width = this._image.width
      canvasEl.height = this._image.height
      this.cx.drawImage(this._image, 0, 0)
    }.bind(this)
  }

  disableSmoothRendering(cx) {
    cx.webkitImageSmoothingEnabled = false
    cx.mozImageSmoothingEnabled = false
    cx.msImageSmoothingEnabled = false
    cx.imageSmoothingEnabled = false
    return cx
  }

  pixelateImage(image, amount) {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement

    this.cx = this.disableSmoothRendering(this.cx)
    // const amount = 0.2
    var w = canvasEl.width * (amount <= 0 ? 0.01 : amount)
    var h = canvasEl.height * (amount <= 0 ? 0.01 : amount)

    // render smaller image
    this.cx.drawImage(image, 0, 0, w, h)
    // stretch the smaller image
    this.cx.drawImage(canvasEl, 0, 0, w, h, 0, 0, image.width, image.height)
  }

  get amount(): number {
    return this._amount
  }

  get image(): HTMLImageElement {
    return this._image
  }
}
