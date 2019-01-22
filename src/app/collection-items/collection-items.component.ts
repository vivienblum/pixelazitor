import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Observable } from "rxjs"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Collection } from "../models/collection"
import { Item } from "../models/item"
import { CollectionService } from "../services/collection.service"
import { ItemService } from "../services/item.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatListModule } from "@angular/material/list"
import { environment } from "../../environments/environment"
import { imageToFile } from "../../shared/utils/image"

@Component({
  selector: "app-collection-items",
  templateUrl: "./collection-items.component.html",
  styleUrls: ["./collection-items.component.scss"]
})
export class CollectionItemsComponent implements OnInit {
  private _collection: Observable<Collection>
  private _items: Observable<Item[]>
  private _loading: boolean = null
  private _edit: boolean = false
  collectionForm: FormGroup
  baseUrl = environment.baseUrl

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private itemService: ItemService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    this._collection = this.collectionService.get(id)
    this._collection.subscribe(
      data => {
        this._items = this.itemService.getItems(id)
        this._items.subscribe(
          res => {
            this._loading = false
          },
          err => {
            this._loading = false
          }
        )
        this.collectionForm = this.fb.group({
          name: [data.name, Validators.required]
        })
      },
      error => {
        this._loading = false
      }
    )
  }

  get loading(): boolean {
    return this._loading
  }

  get edit(): boolean {
    return this._edit
  }

  get collection(): Observable<Collection> {
    return this._collection
  }

  get items(): Observable<Item[]> {
    return this._items
  }

  handleDelete() {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    this.collectionService.delete(id).subscribe(
      res => {
        this._loading = false
        this.router.navigate(["admin"])
      },
      error => {
        this._loading = false
      }
    )
  }

  handleEdit() {
    this._edit = !this._edit
  }

  editCollection() {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    const collection = this.collectionForm.value
    collection.id = id
    this.collectionService.update(collection).subscribe(
      res => {
        this._collection = this.collectionService.get(id)
        this._collection.subscribe(
          data => {
            this.collectionForm = this.fb.group({
              name: [data.name, Validators.required]
            })
            this._loading = false
            this._edit = false
          },
          error => {
            this._loading = false
          }
        )
      },
      error => {
        this._loading = false
      }
    )
  }

  addItem(item: Item) {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    item.append("collection", id)
    this.itemService.add(id, item).subscribe(
      res => {
        this._items = this.itemService.getItems(id)
        this._items.subscribe(
          data => {
            this._loading = false
          },
          error => {
            this._loading = false
          }
        )
      },
      err => {
        this._loading = false
      }
    )
  }
}
