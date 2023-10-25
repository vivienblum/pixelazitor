import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormControl,
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { Item } from '../models/item';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-item-creation',
    templateUrl: './item-creation.component.html',
    styleUrls: ['./item-creation.component.scss'],
})
export class ItemCreationComponent implements OnInit {
    itemForm: UntypedFormGroup;
    selectedFile = null;

    @Output() handleCreateItem: EventEmitter<any> = new EventEmitter();

    constructor(private fb: UntypedFormBuilder) {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            popularity: ['', Validators.required],
            image: ['', Validators.required],
        });
    }

    ngOnInit() {}

    createItem() {
        const formModel = this.itemForm.value;
        const fd = new FormData();
        const fileName = formModel.name
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase();
        fd.append('name', formModel.name);
        fd.append('popularity', formModel.popularity);
        fd.append('image', this.selectedFile, `${fileName}.png`);
        this.handleCreateItem.emit(fd);
    }

    handleFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
}
