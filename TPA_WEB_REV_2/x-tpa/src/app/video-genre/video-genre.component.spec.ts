import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGenreComponent } from './video-genre.component';

describe('VideoGenreComponent', () => {
  let component: VideoGenreComponent;
  let fixture: ComponentFixture<VideoGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
