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

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    //
    this.cx = canvasEl.getContext("2d")
    //
    console.log(canvasEl.width, canvasEl.height)
  }

  get pattern(): number[][] {
    return this._pattern
  }
}
