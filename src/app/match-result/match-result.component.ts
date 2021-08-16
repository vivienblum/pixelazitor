import { Component, OnInit, Input, AfterViewInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { MatchService } from "../services/match.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { Collection } from "../models/collection"
import { Match } from "../models/match"
import { Observable } from "rxjs"
import { Item } from "../models/item"
import { MatDividerModule } from "@angular/material/divider"
import { MatBadgeModule } from "@angular/material/badge"

@Component({
  selector: "app-match-result",
  templateUrl: "./match-result.component.html",
  styleUrls: ["./match-result.component.scss"]
})
export class MatchResultComponent implements OnInit {
  private _loaded: boolean = null
  private _items: Observable<Item[]>
  private _pattern: number[][]
  private _progress: number = 0
  private _match: Observable<Match>
  private _loadingMode: string = "indeterminate"

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this._loaded = false
    const id = parseInt(this.route.snapshot.paramMap.get("id"));
    this._match = this.matchService.get(id)
    this._match.subscribe(data => {
      if (data.finished) {
        this._loaded = true;
        this._items = JSON.parse(data.items).sort((a, b) => {
            return a.name < b.name ? -1 : 1;
        })
        this._pattern = JSON.parse(data.pattern).data
      }
    })
  }

  ngAfterViewInit() {}

  get loaded(): boolean {
    return this._loaded
  }

  get items(): Observable<Item[]> {
    return this._items
  }

  get progress(): number {
    return this._progress
  }

  get pattern(): number[][] {
    return this._pattern
  }

  get match(): Observable<Match> {
    return this._match
  }

  get loadingMode(): string {
    return this._loadingMode
  }
}
