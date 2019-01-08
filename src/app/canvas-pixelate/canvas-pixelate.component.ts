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
  @Input() amount: number

  private cx: CanvasRenderingContext2D
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    // canvas
    this.cx = canvasEl.getContext("2d")

    // Image
    var imageObj = new Image()
    imageObj.src =
      "https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg"

    imageObj.onload = function() {
      canvasEl.width = imageObj.width
      canvasEl.height = imageObj.height
      // this.cx.drawImage(imageObj, 0, 0);
      this.cx = this.disableSmoothRendering(this.cx)
      this.pixelateImage(imageObj, this.amount)
    }.bind(this)

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

  pixelateImage(image, amount) {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    // const amount = 0.2
    var w = canvasEl.width * (amount <= 0 ? 0.01 : amount)
    var h = canvasEl.height * (amount <= 0 ? 0.01 : amount)

    // render smaller image
    this.cx.drawImage(image, 0, 0, w, h)
    // stretch the smaller image
    this.cx.drawImage(canvasEl, 0, 0, w, h, 0, 0, image.width, image.height)
  }
}
