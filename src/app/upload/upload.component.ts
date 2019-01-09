import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  imageSrc: any = null

  @Output() next: EventEmitter<HTMLImageElement> = new EventEmitter()

  constructor() {}

  onImageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        this.imageSrc = reader.result

        const image: HTMLImageElement = new Image()
        image.src = this.imageSrc
        this.next.emit(image)
      }

      reader.readAsDataURL(file)
    }
  }

  ngOnInit() {}
}
