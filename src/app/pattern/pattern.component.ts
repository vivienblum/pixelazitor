import { Component, OnInit, Input } from "@angular/core"
import { Observable } from "rxjs"
import { Item } from "../models/item"

@Component({
  selector: "app-pattern",
  templateUrl: "./pattern.component.html",
  styleUrls: ["./pattern.component.scss"]
})
export class PatternComponent implements OnInit {
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