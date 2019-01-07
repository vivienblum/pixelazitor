import { Component, OnInit } from '@angular/core';
import * as Jimp from 'jimp';
import {
  Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  // selector: 'app-pixelate',
  // templateUrl: './pixelate.component.html',
  // styleUrls: ['./pixelate.component.scss']
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})
export class PixelateComponent implements OnInit {
  imageSrc: any = null
  image = null
  selectedFile: File = null;

  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    var image = document.querySelector('toPixelate')
    // var pixelate = new Pixelate(image, {
    //   amount: 0.7, // default: 0, pixelation percentage amount (range from 0 to 1)
    // });
  //   const src : string = "https://cdn.britannica.com/s:500x350/00/170700-004-26A2C904.jpg";
  //   Jimp.read(src)
  // .then(image => {
  //   // Do stuff with the image.
  // })
  // .catch(err => {
  //   // Handle an exception.
  // });
  }

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);

    //test
    this.cx.fillStyle = "red"
    this.cx.fillRect(0,100,100,100)

    var imageObj = new Image();

    imageObj.onload = function() {
      this.cx.drawImage(imageObj, 69, 50);
    }.bind(this);
    imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
  // this will capture all mousedown events from the canvas element
  fromEvent(canvasEl, 'mousedown')
    .pipe(
      switchMap((e) => {
        // after a mouse down, we'll record all mouse moves
        return fromEvent(canvasEl, 'mousemove')
          .pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          )
      })
    )
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();

      // previous and current position with the offset
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      // this method we'll implement soon to do the actual drawing
      this.drawOnCanvas(prevPos, currentPos);
    });
}

private drawOnCanvas(
  prevPos: { x: number, y: number },
  currentPos: { x: number, y: number }
) {
  // incase the context is not set
  if (!this.cx) { return; }

  // start our drawing path
  this.cx.beginPath();

  // we're drawing lines so we need a previous position
  if (prevPos) {
    // sets the start point
    this.cx.moveTo(prevPos.x, prevPos.y); // from

    // draws a line from the start pos until the current position
    this.cx.lineTo(currentPos.x, currentPos.y);

    // strokes the current path with the styles we set earlier
    this.cx.stroke();
  }
}

  onImageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      this.selectedFile = <File>event.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
          this.imageSrc = reader.result
          // console.log(this.imageSrc)
          Jimp.read(this.imageSrc)
          .then(image => {
            image.resize(256, 256) // resize
            image.quality(60) // set JPEG quality
            image.greyscale() // set greyscale
            image.write('test.jpg')
            console.log(image)
            // this.image = image
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "red"
            ctx.fillRect(0,0,100,100)
            var img = document.getElementById("toto");
            this.cx.drawImage(img, 10, 10);

          })
          .catch(err => {
            // Handle an exception.
          });
      }

      reader.readAsDataURL(file)
    }

  }

}
