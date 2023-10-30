import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormControl,
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../models/collection';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
