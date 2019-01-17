import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPatternComponent } from './canvas-pattern.component';

describe('CanvasPatternComponent', () => {
  let component: CanvasPatternComponent;
  let fixture: ComponentFixture<CanvasPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
