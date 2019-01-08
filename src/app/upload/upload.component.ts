import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  imageSrc: any = null

  constructor() { }

  onImageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
          this.imageSrc = reader.result
      }

      reader.readAsDataURL(file)
    }

  }

  ngOnInit() {}

}
