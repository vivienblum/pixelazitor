import { Component, OnInit } from "@angular/core"
import { Item } from "../models/item"

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
  }
]

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
