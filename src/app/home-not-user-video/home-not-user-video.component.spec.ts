import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNotUserVideoComponent } from './home-not-user-video.component';

describe('HomeNotUserVideoComponent', () => {
  let component: HomeNotUserVideoComponent;
  let fixture: ComponentFixture<HomeNotUserVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNotUserVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNotUserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
