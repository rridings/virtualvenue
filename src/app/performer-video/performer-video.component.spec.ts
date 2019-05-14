import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerVideosComponent } from './performer-videos.component';

describe('PerformerVideosComponent', () => {
  let component: PerformerVideosComponent;
  let fixture: ComponentFixture<PerformerVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformerVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
