import { Component, OnInit, Input, AfterViewInit } from "@angular/core"
import { MatchService } from "../services/match.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { Observable } from "rxjs"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatSnackBar } from "@angular/material"
import { Item } from "../models/item"
import { imageToFile } from "../../shared/utils/image"

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
      // this.file = this.imageToFile(this._image)
      this.file = imageToFile(this._image, "")
    }
  }

  constructor(
    private matchService: MatchService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  get image(): HTMLImageElement {
    return this._image
  }

  onUpload(collection: number) {
    const fd = new FormData()
    const image = imageToFile(this._image, "")
    fd.append("image", image, image.name)
    fd.append("collection", collection.toString())
    fd.append("delta", "100")

    this._loaded = false
    this.matchService.add(fd).subscribe(
      data => {
        this._loaded = true
        this._items = data.items
        this._pattern = data.pattern
      },
      error => {
        this._loaded = null
        this.openSnackBar("Image is too big, try to pixelate it more!", null)
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    })
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
