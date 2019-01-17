import { Component, OnInit } from "@angular/core"

const items = [
  {
    id: 1,
    name: "Leffe",
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
