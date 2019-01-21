import { Component, OnInit } from "@angular/core"
import { CollectionService } from "../services/collection.service"

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.getCollections().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
