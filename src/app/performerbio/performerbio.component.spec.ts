import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerbioComponent } from './performerbio.component';

describe('PerformerbioComponent', () => {
  let component: PerformerbioComponent;
  let fixture: ComponentFixture<PerformerbioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformerbioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerbioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
