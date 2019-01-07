import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas-pixelate',
  templateUrl: './canvas-pixelate.component.html',
  styles: ['./canvas-pixelate.component.scss']
})
export class CanvasPixelateComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

    this.cx = canvasEl.getContext('2d');

    // Image
    var imageObj = new Image();
    imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

    imageObj.onload = function() {
      canvasEl.width = imageObj.width;
      canvasEl.height = imageObj.height;
      this.cx.drawImage(imageObj, 0, 0);
    }.bind(this);

  }
}
