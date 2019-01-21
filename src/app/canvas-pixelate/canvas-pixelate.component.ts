import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
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
  static WIDTH = 400
  static HEIGHT = 400
  // @Input() amount: number
  @Input()
  set amount(amount: number) {
    if (amount && this._amount !== amount) {
      this._amount = amount
      if (this.cx) {
        this.pixelateImage(this._image, this._amount)
        const imagePixelate = this.canvas.nativeElement.toDataURL("image/png")
        this.handleImageChange.emit(imagePixelate)
      }
    }
  }

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement

    this.cx = canvasEl.getContext("2d")

    if (this._image) {
      this._image.onload = function() {
        const agrandissement = this.getAgrandissement(this._image)
        if (
          this._image.width <= CanvasPixelateComponent.WIDTH &&
          this._image.height <= CanvasPixelateComponent.HEIGHT
        ) {
          canvasEl.width = this._image.width
          canvasEl.height = this._image.height
        } else if (this._image.height <= CanvasPixelateComponent.HEIGHT) {
          canvasEl.width = CanvasPixelateComponent.WIDTH
          canvasEl.height = this._image.height
        } else if (this._image.width <= CanvasPixelateComponent.WIDTH) {
          canvasEl.width = this._image.width
          canvasEl.height = CanvasPixelateComponent.HEIGHT
        } else {
          if (this._image.width > this._image.height) {
            canvasEl.width = CanvasPixelateComponent.WIDTH
            canvasEl.height = this._image.height * agrandissement
          } else {
            canvasEl.width = this._image.width * agrandissement
            canvasEl.height = CanvasPixelateComponent.HEIGHT
          }
        }

        this.cx.drawImage(
          this._image,
          0,
          0,
          this._image.width * agrandissement,
          this._image.height * agrandissement
        )
      }.bind(this)
    }
  }

  @Output()
  handleImageChange: EventEmitter<HTMLImageElement> = new EventEmitter()

  private cx: CanvasRenderingContext2D
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  disableSmoothRendering(cx) {
    cx.webkitImageSmoothingEnabled = false
    cx.mozImageSmoothingEnabled = false
    cx.msImageSmoothingEnabled = false
    cx.imageSmoothingEnabled = false
    return cx
  }

  pixelateImage(image, amount) {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    const agrandissement = this.getAgrandissement(image)

    this.cx = this.disableSmoothRendering(this.cx)
    // const amount = 0.2
    var w = canvasEl.width * (amount <= 0 ? 0.01 : amount)
    var h = canvasEl.height * (amount <= 0 ? 0.01 : amount)

    // render smaller image
    this.cx.drawImage(image, 0, 0, w, h)
    // stretch the smaller image
    this.cx.drawImage(
      canvasEl,
      0,
      0,
      w,
      h,
      0,
      0,
      image.width * agrandissement,
      image.height * agrandissement
    )
  }

  getAgrandissement(image: HTMLImageElement): number {
    if (
      image.width <= CanvasPixelateComponent.WIDTH &&
      image.height <= CanvasPixelateComponent.HEIGHT
    ) {
      return 1
    } else if (image.height <= CanvasPixelateComponent.HEIGHT) {
      return CanvasPixelateComponent.WIDTH / image.width
    } else if (image.width <= CanvasPixelateComponent.WIDTH) {
      return CanvasPixelateComponent.HEIGHT / image.height
    } else {
      if (image.width > image.height) {
        return CanvasPixelateComponent.WIDTH / image.width
      } else {
        return CanvasPixelateComponent.HEIGHT / image.height
      }
    }
  }

  get amount(): number {
    return this._amount
  }

  get image(): HTMLImageElement {
    return this._image
  }
}
