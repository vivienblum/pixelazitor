import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPixelateComponent } from './canvas-pixelate.component';

describe('CanvasPixelateComponent', () => {
  let component: CanvasPixelateComponent;
  let fixture: ComponentFixture<CanvasPixelateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPixelateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPixelateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
