import { Component, OnInit } from "@angular/core"
import { Collection } from "../models/collection"
import { CollectionService } from "../services/collection.service"
import { Observable } from "rxjs"
import { MatListModule } from "@angular/material/list"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatDividerModule } from "@angular/material/divider"

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"]
})
export class CollectionsComponent implements OnInit {
  private _collections: Observable<Collection[]>
  private _loading: boolean = null

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this._loading = true
    this._collections = this.collectionService.getCollections()
    this._collections.subscribe(
      data => {
        this._loading = false
      },
      error => {
        this._loading = false
      }
    )
  }

  get collections(): Observable<Collection[]> {
    return this._collections
  }

  add(collection: Collection) {
    this._loading = true
    this.collectionService.add(collection).subscribe(() => {
      this._collections = this.collectionService.getCollections()
      this._collections.subscribe(
        data => {
          this._loading = false
        },
        error => {
          this._loading = false
        }
      )
    })
  }

  get loading(): boolean {
    return this._loading
  }
}
