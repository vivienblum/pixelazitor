import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Collection } from '../models/collection';
import { Item } from '../models/item';
import { CollectionService } from '../services/collection.service';
import { ItemService } from '../services/item.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-collection-items',
    templateUrl: './collection-items.component.html',
    styleUrls: ['./collection-items.component.scss'],
})
export class CollectionItemsComponent implements OnInit {
    private _collection: Observable<Collection>;
    private _items: Observable<Item[]>;
    private _loading: boolean = null;
    private _edit: boolean = false;
    private _add: boolean = false;
    private _addMany: boolean = false;
    private _loadedContent: number = null;
    private _contentLength: number = null;
    collectionForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private collectionService: CollectionService,
        private itemService: ItemService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this._loading = true;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this._collection = this.collectionService.get(id);
        this._collection.subscribe(
            (data) => {
                this._items = this.itemService.getItems(id);
                this._items.subscribe(
                    (res) => {
                        this._loading = false;
                    },
                    (err) => {
                        this._loading = false;
                    }
                );
                this.collectionForm = this.fb.group({
                    name: [data.name, Validators.required],
                    available: [data.available, Validators.required],
                    has_popularity: [data.has_popularity, Validators.required],
                    delta: [data.delta, Validators.required],
                });
            },
            (error) => {
                this._loading = false;
                this.router.navigate(['admin']);
            }
        );
    }

    get loading(): boolean {
        return this._loading;
    }

    get edit(): boolean {
        return this._edit;
    }

    get add(): boolean {
        return this._add;
    }

    get addMany(): boolean {
        return this._addMany;
    }

    get loadingProgress(): number {
        return this._loadedContent && this._contentLength
            ? Math.round((this._loadedContent / this._contentLength) * 100)
            : null;
    }

    get collection(): Observable<Collection> {
        return this._collection;
    }

    get items(): Observable<Item[]> {
        return this._items;
    }

    handleDelete() {
        this._loading = true;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.collectionService.delete(id).subscribe(
            (res) => {
                this._loading = false;
                this.router.navigate(['admin']);
            },
            (error) => {
                this._loading = false;
            }
        );
    }

    handleEditChange() {
        this._edit = !this._edit;
    }

    handleAddChange() {
        this._add = !this._add;
    }

    handleAddManyChange() {
        this._addMany = !this._addMany;
    }

    editCollection() {
        this._loading = true;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        const collection = this.collectionForm.value;
        collection.id = id;
        this.collectionService.update(collection).subscribe(
            (res) => {
                this._collection = this.collectionService.get(id);
                this._collection.subscribe(
                    (data) => {
                        this.collectionForm = this.fb.group({
                            name: [data.name, Validators.required],
                            available: [data.available, Validators.required],
                            has_popularity: [
                                data.has_popularity,
                                Validators.required,
                            ],
                            delta: [data.delta, Validators.required],
                        });
                        this._loading = false;
                        this._edit = false;
                    },
                    (error) => {
                        this._loading = false;
                    }
                );
            },
            (error) => {
                this._loading = false;
            }
        );
    }

    addItem(item: any) {
        this._loading = true;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        item.append('collection', id);
        this.itemService.add(id, item).subscribe(
            (res) => {
                this._items = this.itemService.getItems(id);
                this._items.subscribe(
                    (data) => {
                        this._loading = false;
                        this._add = false;
                    },
                    (error) => {
                        this._loading = false;
                        this._add = false;
                    }
                );
            },
            (err) => {
                this._loading = false;
                this._add = false;
            }
        );
    }

    addManyItems(data: FormData[]) {
        this._loading = true;
        this._contentLength = data.length;
        this._loadedContent = 0;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        data.forEach((item) => {
            item.append('collection', id.toString());
            this.itemService.add(id, item).subscribe(
                (res) => {
                    this._loadedContent++;
                    if (this._loadedContent === this._contentLength) {
                        this._items = this.itemService.getItems(id);
                        this._items.subscribe(
                            (data) => {
                                this._loading = false;
                                this._addMany = false;
                                this._contentLength = null;
                                this._loadedContent = null;
                            },
                            (error) => {
                                this._loading = false;
                                this._addMany = false;
                                this._contentLength = null;
                                this._loadedContent = null;
                            }
                        );
                    }
                },
                (error) => {
                    this._loading = false;
                    this._addMany = false;
                    this._contentLength = null;
                    this._loadedContent = null;
                }
            );
        });
    }

    handleDeleteItem(item: Item) {
        this._loading = true;
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.itemService.delete(id, item.id).subscribe(
            (res) => {
                this._items = this.itemService.getItems(id);
                this._items.subscribe(
                    (data) => {
                        this._loading = false;
                    },
                    (error) => {
                        this._loading = false;
                    }
                );
            },
            (error) => {
                this._loading = false;
            }
        );
    }
}
