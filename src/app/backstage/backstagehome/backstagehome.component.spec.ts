import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackstagehomeComponent } from './backstagehome.component';

describe('BackstagehomeComponent', () => {
  let component: BackstagehomeComponent;
  let fixture: ComponentFixture<BackstagehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackstagehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackstagehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
