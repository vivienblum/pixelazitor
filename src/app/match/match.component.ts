import { Component, OnInit, Input, AfterViewInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  private _image: HTMLImageElement = null
  file: File = null

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image
    if (this._image) {
      this.file = this.imageToFile(this._image)
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  get image(): HTMLImageElement {
    return this._image
  }

  onUpload() {
    console.log(this.imageToFile(this._image))

    const fd = new FormData()
    fd.append("image", this.file, this.file.name)
    this.http
      .post(
        "http://us-central-fb-cloud-functions-demo.cloudfunctions.net/uploadFile",
        fd
      )
      .subscribe(res => {
        console.log(res)
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
}
