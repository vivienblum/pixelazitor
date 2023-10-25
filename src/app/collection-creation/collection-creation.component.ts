import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormControl,
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../models/collection';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-collection-creation',
    templateUrl: './collection-creation.component.html',
    styleUrls: ['./collection-creation.component.scss'],
})
export class CollectionCreationComponent implements OnInit {
    collectionForm: UntypedFormGroup;

    @Output()
    handleCreateCollection: EventEmitter<Collection> = new EventEmitter();

    constructor(
        private fb: UntypedFormBuilder,
        private collectionService: CollectionService
    ) {
        this.collectionForm = this.fb.group({
            name: ['', Validators.required],
            available: ['', Validators.required],
            has_popularity: ['', Validators.required],
            delta: ['', Validators.required],
        });
    }

    ngOnInit() {}

    createCollection() {
        const collection = this.collectionForm.value;

        this.handleCreateCollection.emit(collection);
    }
}
