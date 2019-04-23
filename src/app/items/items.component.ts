import { Component, OnInit, Input } from "@angular/core"
import { Item } from "../models/item"
import { MatListModule } from "@angular/material/list"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { MatDividerModule } from "@angular/material/divider"

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  private _items: Observable<Item[]>

  @Input()
  set items(items: Observable<Item[]>) {
    this._items = items
  }

  constructor() {}

  ngOnInit() {}

  get items(): Observable<Item[]> {
    return this._items
  }
}
