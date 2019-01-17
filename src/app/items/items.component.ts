import { Component, OnInit, Input } from "@angular/core"
import { Item } from "../models/item"
import { MatListModule } from "@angular/material/list"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"

const items = <Item[]>[
  {
    id: 1,
    name: "Leffe",
    image:
      "https://match-images.herokuapp.com/media/item_image/grey_XzGE43q.png",
    collection: 5,
    blue: 79,
    green: 84,
    red: 89
  },
  {
    id: 2,
    name: "Desperados",
    image: "https://match-images.herokuapp.com/media/item_image/pink.png",
    collection: 5,
    blue: 30,
    green: 100,
    red: 200
  }
]

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  private _items: Observable<Item[]>
  baseUrl = environment.baseUrl

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
