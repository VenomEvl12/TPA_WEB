import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaylistBoxComponent } from './search-playlist-box.component';

describe('SearchPlaylistBoxComponent', () => {
  let component: SearchPlaylistBoxComponent;
  let fixture: ComponentFixture<SearchPlaylistBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlaylistBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaylistBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
