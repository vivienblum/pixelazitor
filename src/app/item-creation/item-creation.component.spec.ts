import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreationComponent } from './item-creation.component';

describe('ItemCreationComponent', () => {
  let component: ItemCreationComponent;
  let fixture: ComponentFixture<ItemCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
