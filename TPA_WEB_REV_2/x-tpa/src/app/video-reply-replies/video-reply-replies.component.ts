import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MonthCreator } from '../generateMonth';
import { ActivatedRoute } from '@angular/router';
import { updateReplyLike } from '../video-reply/video-reply.component';

export const getVal = gql
`
mutation getVal($userID: ID!, $replyID: ID!, $videoID: ID!, $replyRepliesID: ID!){
  createNewVideoReplyRepliesLikeVali(input:{
    userID: $userID
    replyID: $replyID
    videoID: $videoID
    replyRepliesID: $replyRepliesID
  }){
    videoReplyRepliesLikeValiID
    userID
    replyID
    videoID
    like
    dislike
  }
}
`

export const updateLikeVal = gql
`
mutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){
  updateVideReplyRepliesLikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){
    videoReplyRepliesLikeValiID
    userID
    replyID
    videoID
    replyRepliesID
    like
		dislike
  }
}
`

export const updateDislikeVal = gql
`
mutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){
  updateVideoReplyRepliesDislikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){
    videoReplyRepliesLikeValiID
    userID
    replyID
    videoID
    like
		dislike
  }
}
`

export const updateLike = gql
`
mutation updateLike($replyReplies: ID!, $like: Boolean!){
  updateReplyRepliesLikes(replyRepliesID: $replyReplies, like: $like){
    like
    dislike
  }
}
`

export const updateDislike = gql
`
mutation updateLike($replyReplies: ID!, $dislike: Boolean!){
  updateReplyRepliesDislikes(replyRepliesID: $replyReplies, dislike: $dislike){
    like
    dislike
  }
}
`

@Component({
  selector: 'app-video-reply-replies',
  templateUrl: './video-reply-replies.component.html',
  styleUrls: ['./video-reply-replies.component.sass']
})
export class VideoReplyRepliesComponent implements OnInit {

  @Input("replies") replies: any

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  replyReplies: any

  videoID: any
  userID: any
  replyID: any
  replyRepliesID: any
  month: string
  like: number
  dislike: number

  likeVal: any

  ngOnInit(): void {
    this.initialization()
    this.generateMonth()
    this.getValidation()
  }

  initialization(): void{
    this.videoID = parseInt(this.route.snapshot.paramMap.get('id'))
    this.userID = localStorage.getItem('userID')
    this.replyID = this.replies.replyID
    this.replyRepliesID = this.replies.replyRepliesID
    this.like = this.replies.like
    this.dislike = this.replies.dislike
  }

  generateMonth(): void{
    let monthCreate = new MonthCreator()
    this.month = monthCreate.createMonth(this.replies.month)
  }

  getValidation(): void {
    if(this.userID == null){
      return
    }
    this.apollo.mutate({
      mutation: getVal, variables: {
        userID: this.userID,
        videoID: this.videoID,
        replyID: this.replyID,
        replyRepliesID: this.replyRepliesID
      }
    }).subscribe(result => {
      this.replyReplies = result.data['createNewVideoReplyRepliesLikeVali']
    })
  }

  updateLike(): void{
    if(this.userID == null){
      return
    }
    this.apollo.mutate({
      mutation: updateLikeVal, variables: {
        replyReplies: this.replyReplies.videoReplyRepliesLikeValiID,
        videoID: this.videoID,
        userID: this.userID,
        replyID: this.replyID,
        replyRepliesID: this.replyRepliesID
      }
    }).subscribe(result => {
      this.likeVal = result.data['updateVideReplyRepliesLikeVali']
      this.apollo.mutate({
        mutation: updateLike, variables: {
          replyReplies: this.replies.replyRepliesID,
          like: this.likeVal.like
        }
      }).subscribe(result => {
        this.like = result.data['updateReplyRepliesLikes']['like']
      })
    })
  }

  updateDislike(): void{
    if(this.userID == null){
      return
    }
    this.apollo.mutate({
      mutation: updateDislikeVal, variables: {
        replyReplies: this.replyReplies.videoReplyRepliesLikeValiID,
        videoID: this.videoID,
        userID: this.userID,
        replyID: this.replyID,
        replyRepliesID: this.replyRepliesID
      }
    }).subscribe(result => {
      this.likeVal = result.data['updateVideoReplyRepliesDislikeVali']

      this.apollo.mutate({
        mutation: updateDislike, variables: {
          replyReplies: this.replies.replyRepliesID,
          dislike: this.likeVal.dislike
        }
      }).subscribe(result => {
        this.dislike = result.data['updateReplyRepliesDislikes']['dislike']
      })
    })
  }

}
