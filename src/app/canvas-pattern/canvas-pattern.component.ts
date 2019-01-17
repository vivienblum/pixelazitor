import { Component, OnInit, Input } from "@angular/core"
import { Observable } from "rxjs"

@Component({
  selector: "app-canvas-pattern",
  templateUrl: "./canvas-pattern.component.html",
  styleUrls: ["./canvas-pattern.component.scss"]
})
export class CanvasPatternComponent implements OnInit {
  private _pattern: number[][]

  @Input()
  set pattern(pattern: number[][]) {
    this._pattern = pattern
  }

  constructor() {}

  ngOnInit() {}

  get pattern(): number[][] {
    return this._pattern
  }
}
