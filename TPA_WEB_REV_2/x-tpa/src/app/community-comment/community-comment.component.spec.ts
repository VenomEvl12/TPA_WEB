import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCommentComponent } from './community-comment.component';

describe('CommunityCommentComponent', () => {
  let component: CommunityCommentComponent;
  let fixture: ComponentFixture<CommunityCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
