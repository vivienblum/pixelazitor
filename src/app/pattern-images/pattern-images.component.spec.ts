import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternImagesComponent } from './pattern-images.component';

describe('PatternImagesComponent', () => {
    let component: PatternImagesComponent;
    let fixture: ComponentFixture<PatternImagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatternImagesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatternImagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
