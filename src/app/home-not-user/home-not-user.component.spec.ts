import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNotUserComponent } from './home-not-user.component';

describe('HomeNotUserComponent', () => {
  let component: HomeNotUserComponent;
  let fixture: ComponentFixture<HomeNotUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNotUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNotUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
