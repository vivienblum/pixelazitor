import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Item } from "../models/item"

@Component({
  selector: "app-items-creation",
  templateUrl: "./items-creation.component.html",
  styleUrls: ["./items-creation.component.scss"]
})
export class ItemsCreationComponent implements OnInit {
  itemsForm: FormGroup
  selectedFiles: FileList

  @Output() handleCreateItems: EventEmitter<FormData[]> = new EventEmitter()

  constructor(private fb: FormBuilder) {
    this.itemsForm = this.fb.group({
      images: ["", Validators.required]
    })
  }

  ngOnInit() {}

  createItems() {
    const data: FormData[] = new Array()

    Array.from(this.selectedFiles).forEach(el => {
      const fd = new FormData()
      const fileName = el
        ? el.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : "tmp"
      fd.append("name", el.name)
      fd.append("image", el, `${fileName}.png`)

      data.push(fd)
    })
    this.handleCreateItems.emit(data)
  }

  handleFilesSelected(event) {
    this.selectedFiles = event.target.files
  }
}
