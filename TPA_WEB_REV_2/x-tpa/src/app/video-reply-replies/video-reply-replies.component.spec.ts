import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReplyRepliesComponent } from './video-reply-replies.component';

describe('VideoReplyRepliesComponent', () => {
  let component: VideoReplyRepliesComponent;
  let fixture: ComponentFixture<VideoReplyRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoReplyRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoReplyRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
