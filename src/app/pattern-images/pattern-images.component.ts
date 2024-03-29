import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Component({
    selector: 'app-pattern-images',
    templateUrl: './pattern-images.component.html',
    styleUrls: ['./pattern-images.component.scss'],
})
export class PatternImagesComponent implements OnInit {
    private _items: Item[];
    private _itemsIndexed: Item[];
    private _pattern: number[][];
    private _sizeImage: number;
    private _selectedItem: number;

    @Input()
    set items(items: Item[]) {
        // this._items = items
        if (items && items != this._items) {
            this._items = items;
            let itemsIndexed: Item[] = new Array(this._items.length);
            this._items.forEach((item) => {
                itemsIndexed[item.id] = item;
            });
            this._itemsIndexed = itemsIndexed;
        }
    }

    @Input()
    set pattern(pattern: number[][]) {
        this._pattern = pattern;
    }

    @Input()
    set selectedItem(selectedItem: number) {
        this._selectedItem = selectedItem;
    }

    constructor() {}

    ngOnInit() {
        const height = window.screen.availHeight;
        const width = window.screen.availWidth;
        const nbRows = this._pattern.length;
        const nbColumns = this._pattern[0].length;
        if (nbRows > nbColumns) {
            this._sizeImage = Math.floor(
                (0.8 * window.screen.availHeight) / nbRows
            );
        } else if (nbRows === nbColumns) {
            const size = Math.min(
                0.8 * window.screen.availHeight,
                0.7 * window.screen.availWidth
            );
            this._sizeImage = Math.floor(size / nbColumns);
        } else {
            this._sizeImage = Math.floor(
                (0.7 * window.screen.availWidth) / nbColumns
            );
        }
    }

    getStyle() {
        return {
            height: `${this._sizeImage}px`,
            width: `${this._sizeImage}px`,
        };
    }

    get pattern(): number[][] {
        return this._pattern;
    }

    get selectedItem(): number {
        return this._selectedItem;
    }

    getItemImage(id: number) {
        return this._itemsIndexed[id].image_url;
    }
}
