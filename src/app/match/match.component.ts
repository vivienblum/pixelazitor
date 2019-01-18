import { Component, OnInit, Input, AfterViewInit } from "@angular/core"
import { MatchService } from "../services/match.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { Observable } from "rxjs"
import { Item } from "../models/item"

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  private _image: HTMLImageElement = null
  private _loaded: boolean = null
  private _items: Observable<Item[]>
  private _pattern: number[][]
  file: File = null

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image
    if (this._image) {
      this.file = this.imageToFile(this._image)
    }
  }

  constructor(private matchService: MatchService) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  get image(): HTMLImageElement {
    return this._image
  }

  onUpload(collection: number) {
    const fd = new FormData()
    const image = this.imageToFile(this._image)
    fd.append("image", image, image.name)
    fd.append("collection", collection.toString())
    fd.append("delta", "255")

    this._loaded = false
    this.matchService.add(fd).subscribe(res => {
      this._loaded = true
      this._items = res.items
      this._pattern = res.pattern
    })
  }

  // TODO create service
  imageToFile(image: HTMLImageElement): File {
    var blobBin = atob(image.src.split(",")[1])
    var array = []
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i))
    }
    var blob = new Blob([new Uint8Array(array)], { type: "image/png" })
    return new File([blob], "dot.png", blob)
  }

  get loaded(): boolean {
    return this._loaded
  }

  get items(): Observable<Item[]> {
    return this._items
  }

  get pattern(): number[][] {
    return this._pattern
  }
}
