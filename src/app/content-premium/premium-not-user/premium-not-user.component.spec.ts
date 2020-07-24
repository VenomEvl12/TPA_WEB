import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumNotUserComponent } from './premium-not-user.component';

describe('PremiumNotUserComponent', () => {
  let component: PremiumNotUserComponent;
  let fixture: ComponentFixture<PremiumNotUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumNotUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumNotUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
