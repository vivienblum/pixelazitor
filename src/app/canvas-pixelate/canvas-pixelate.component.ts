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
      console.log("Setting ...")
      if (this.cx) {
        console.log("Setting image ... ", this._amount)
        this.pixelateImage(this._image, this._amount)
      }
      //
    }
  }

  private cx: CanvasRenderingContext2D
  constructor() {
    this._image = new Image()
    this._image.src =
      "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg"
  }

  ngOnInit() {
    console.log("Init")
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    // canvas
    this.cx = canvasEl.getContext("2d")
    // this.cx = this.disableSmoothRendering(this.cx)
    this._image.onload = function() {
      canvasEl.width = this._image.width
      canvasEl.height = this._image.height
      this.cx.drawImage(this._image, 0, 0)
      // this.cx = this.disableSmoothRendering(this.cx)
    }.bind(this)
  }

  ngAfterViewInit() {
    console.log("After view init")
    // this._image.onload = function() {
    //   canvasEl.width = this._image.width
    //   canvasEl.height = this._image.height
    //   this.cx.drawImage(this._image, 0, 0)
    //   // this.cx = this.disableSmoothRendering(this.cx)
    // }.bind(this)
    // Test
    // this.image.src = this.canvas.toDataURL('image/png');
  }

  disableSmoothRendering(cx) {
    cx.webkitImageSmoothingEnabled = false
    cx.mozImageSmoothingEnabled = false
    cx.msImageSmoothingEnabled = false
    cx.imageSmoothingEnabled = false
    return cx
  }

  pixelateImage(imageLoc, amount) {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement

    this.cx = this.disableSmoothRendering(this.cx)
    // const amount = 0.2
    var w = canvasEl.width * (amount <= 0 ? 0.01 : amount)
    var h = canvasEl.height * (amount <= 0 ? 0.01 : amount)

    // render smaller imageLoc
    this.cx.drawImage(imageLoc, 0, 0, w, h)
    // stretch the smaller imageLoc
    this.cx.drawImage(
      canvasEl,
      0,
      0,
      w,
      h,
      0,
      0,
      imageLoc.width,
      imageLoc.height
    )
  }

  get amount(): number {
    return this._amount
  }

  get image(): HTMLImageElement {
    return this._image
  }
}
