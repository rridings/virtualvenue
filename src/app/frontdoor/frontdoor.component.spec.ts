import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdoorComponent } from './frontdoor.component';

describe('FrontdoorComponent', () => {
  let component: FrontdoorComponent;
  let fixture: ComponentFixture<FrontdoorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontdoorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontdoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
