import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChannelBoxComponent } from './search-channel-box.component';

describe('SearchChannelBoxComponent', () => {
  let component: SearchChannelBoxComponent;
  let fixture: ComponentFixture<SearchChannelBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChannelBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChannelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
