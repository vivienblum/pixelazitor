import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCreationComponent } from './items-creation.component';

describe('ItemsCreationComponent', () => {
    let component: ItemsCreationComponent;
    let fixture: ComponentFixture<ItemsCreationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsCreationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsCreationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
