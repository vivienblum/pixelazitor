import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPatternImagesComponent } from './canvas-pattern-images.component';

describe('CanvasPatternImagesComponent', () => {
  let component: CanvasPatternImagesComponent;
  let fixture: ComponentFixture<CanvasPatternImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPatternImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPatternImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
