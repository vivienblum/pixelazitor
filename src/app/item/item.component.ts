import { Component, OnInit, Input } from "@angular/core"
import { Item } from "../models/item"
import { ActivatedRoute, Router } from "@angular/router"
import { MatListModule } from "@angular/material/list"
import { ItemService } from "../services/item.service"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { MatDividerModule } from "@angular/material/divider"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  private _item: Item
  private _loading: boolean = null
  private _edit: boolean = false
  itemForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private fb: FormBuilder,
  ) {}

  @Input()
  set item(item: Item) {
    this._item = item
  }

  ngOnInit() {
      this.itemForm = this.fb.group({
        name: [this._item.name],
        popularity: [this._item.popularity],
      })
  }

  get item(): Item {
    return this._item
  }

  get edit(): boolean {
    return this._edit
  }

  get loading(): boolean {
    return this._loading
  }

  handleEditChange() {
      this._edit = !this._edit
  }

  editItem() {
      this._loading = true
      const item = this.itemForm.value
      item.id = this._item.id
      this.itemService.update(this._item.collection_id, item).subscribe(
          res => {
              this._item.name = res.name
              this._item.popularity = res.popularity
              this._loading = false
              this._edit = false
          },
          error => {
              this._loading = false
          }
      )
  }

  handleDeleteItem() {
    this._loading = true
    const id = parseInt(this.route.snapshot.paramMap.get("id"))
    this.itemService.delete(id, this._item.id).subscribe(
      res => {
        this._loading = false
        this._item = null
      },
      error => {
        this._loading = false
      }
    )
  }
}
