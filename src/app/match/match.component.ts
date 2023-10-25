import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { Collection } from '../models/collection';
import { Match } from '../models/match';
import { CollectionService } from '../services/collection.service';
import { Observable } from 'rxjs';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Item } from '../models/item';
import { imageToFile } from '../../shared/utils/image';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
    private _image: HTMLImageElement = null;
    private _loaded: boolean = null;
    private _items: Observable<Item[]>;
    private _pattern: number[][];
    private _progress: number = 0;
    private _match: Observable<Match>;
    private _collections: Observable<Collection[]>;
    private _loadingMode: string = 'indeterminate';
    file: File = null;

    @Input()
    set image(image: HTMLImageElement) {
        this._image = image;
        if (this._image) {
            // this.file = this.imageToFile(this._image)
            this.file = imageToFile(this._image, '');
        }
    }

    constructor(
        private router: Router,
        private matchService: MatchService,
        private collectionService: CollectionService,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this._collections = this.collectionService.getCollections(true);
        this._collections.subscribe();
    }

    ngAfterViewInit() {}

    get image(): HTMLImageElement {
        return this._image;
    }

    onUpload(collection: number) {
        const fd = new FormData();
        const image = imageToFile(this._image, '');
        fd.append('image', image, image.name);
        fd.append('collection_id', collection.toString());
        fd.append('delta', '100');

        this._loaded = false;
        this._loadingMode = 'indeterminate';
        this.matchService.add(fd).subscribe(
            (data) => {
                if (data.id) {
                    this._loaded = true;
                    this.router.navigate(['/match', data.id]);
                }
            },
            (error) => {
                this._loaded = null;
                this.openSnackBar(
                    'Image is too big, try to pixelate it more!',
                    null
                );
            }
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }

    get loaded(): boolean {
        return this._loaded;
    }

    get items(): Observable<Item[]> {
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

    get hasImage(): boolean {
        return this._image !== null;
    }

    get collections(): Observable<Collection[]> {
        return this._collections;
    }

    get loadingMode(): string {
        return this._loadingMode;
    }
}
