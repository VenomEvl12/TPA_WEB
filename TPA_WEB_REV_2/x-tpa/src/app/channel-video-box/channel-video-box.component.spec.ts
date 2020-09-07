import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelVideoBoxComponent } from './channel-video-box.component';

describe('ChannelVideoBoxComponent', () => {
  let component: ChannelVideoBoxComponent;
  let fixture: ComponentFixture<ChannelVideoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelVideoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelVideoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
