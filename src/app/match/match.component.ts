import { Component, OnInit, Input } from "@angular/core"

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  private _image: HTMLImageElement = null

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image
  }

  constructor() {}

  ngOnInit() {}

  get image(): HTMLImageElement {
    return this._image
  }
}
