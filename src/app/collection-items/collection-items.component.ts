import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { Collection } from "../models/collection"
import { CollectionService } from "../services/collection.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-collection-items",
  templateUrl: "./collection-items.component.html",
  styleUrls: ["./collection-items.component.scss"]
})
export class CollectionItemsComponent implements OnInit {
  private _collection: Observable<Collection>
  private _loading: boolean = null

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    this._collection = this.collectionService.get(id)
    this._collection.subscribe(
      data => {
        this._loading = false
      },
      error => {
        this._loading = false
      }
    )
  }

  get loading(): boolean {
    return this._loading
  }

  get collection(): Observable<Collection> {
    return this._collection
  }
}
