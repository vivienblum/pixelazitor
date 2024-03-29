import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { Collection } from '../models/collection';
import { Match } from '../models/match';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-match-result',
    templateUrl: './match-result.component.html',
    styleUrls: ['./match-result.component.scss'],
})
export class MatchResultComponent implements OnInit {
    private _loaded: boolean = null;
    private _items: Item[];
    private _pattern: number[][];
    private _progress: number = 0;
    private _match: Observable<Match>;
    private _loadingMode: string = 'indeterminate';
    private _selectedItem: number = null;

    constructor(
        private route: ActivatedRoute,
        private matchService: MatchService
    ) {}

    ngOnInit() {
        this._loaded = false;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this._match = this.matchService.get(id);
        this._match.subscribe((data) => {
            this._loaded = true;
            this._pattern = data.pattern;
            this._items = data.items;
        });
    }

    ngAfterViewInit() {}

    get loaded(): boolean {
        return this._loaded;
    }

    get items(): Item[] {
        return this._items;
    }

    get progress(): number {
        return this._progress;
    }

    get pattern(): number[][] {
        return this._pattern;
    }

    get match(): Observable<Match> {
        return this._match;
    }

    get loadingMode(): string {
        return this._loadingMode;
    }

    get selectedItem(): number {
        return this._selectedItem;
    }

    handleFocusItem(id: number) {
        this._selectedItem = id;
    }
}
