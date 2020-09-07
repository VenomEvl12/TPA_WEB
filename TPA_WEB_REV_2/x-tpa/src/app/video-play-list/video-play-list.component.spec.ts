import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayListComponent } from './video-play-list.component';

describe('VideoPlayListComponent', () => {
  let component: VideoPlayListComponent;
  let fixture: ComponentFixture<VideoPlayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
