import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
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
  private _selectedItem: number = null;

  @Input()
  set items(items: Observable<Item[]>) {
    this._items = items
  }

  @Output() handleFocusItem: EventEmitter<number> = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  get items(): Observable<Item[]> {
    return this._items
  }

  clickItem(id: number) {
    if (this._selectedItem === id) {
      this._selectedItem = null;
    } else {
      this._selectedItem = id;
    }

    this.handleFocusItem.emit(this._selectedItem);
  }

  get selectedItem(): number {
    return this._selectedItem;
  }
}
