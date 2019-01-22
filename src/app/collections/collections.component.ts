import { Component, OnInit } from "@angular/core"
import { Collection } from "../models/collection"
import { CollectionService } from "../services/collection.service"
import { Observable } from "rxjs"
import { MatListModule } from "@angular/material/list"

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"]
})
export class CollectionsComponent implements OnInit {
  private _collections: Observable<Collection[]>

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this._collections = this.collectionService.getCollections()
  }

  get collections(): Observable<Collection[]> {
    return this._collections
  }
}
