import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPlaylistBoxComponent } from './channel-playlist-box.component';

describe('ChannelPlaylistBoxComponent', () => {
  let component: ChannelPlaylistBoxComponent;
  let fixture: ComponentFixture<ChannelPlaylistBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPlaylistBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPlaylistBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
