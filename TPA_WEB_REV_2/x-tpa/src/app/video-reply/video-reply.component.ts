import { Component, OnInit, Query, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';

export const getVideo = gql`
  query test2($video_id: ID!) {
    Videos(videoID: $video_id){
      videoID
      sourceLink
      title
      views
      day
      month
      year
      like
      dislike
      descriptions
      user{
      	id
        thumbnail
        subscribers
        username
      }
  	videoReply{
      user{
        id
        thumbnail
        username
      }
      videoID
      replyID
      likes
      day
      month
      year
      dislikes
      description
      replyReplies{
        videoID
        replyRepliesID
        replyID
        day
        month
        year
        user{
          id
          username
          thumbnail
        }
        like
        dislike
        description
      }
    	}
    }
  }
`

export const createReplyReplies = gql
`
mutation createReplyReplies($replyID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){
  createReplyReplies(input:{
    replyID: $replyID
    userID: $userID
    day: $day
    month: $month
    year: $year
    description: $description
  }){
    replyRepliesID
  }
}
`

export const getreplyLikeVal = gql
`
mutation getReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){
  createNewVideoReplyLikeVali(input:{
    userID: $userID
    videoID: $videoID
    replyID: $replyID 
  }){
    userID
    videoID
    replyID
    like
    dislike
  }
}
`

export const updateReplyLikeVal = gql
`
mutation updateReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){
  updateVideoReplyLikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){
    userID
    videoID
    replyID
    like
    dislike
  }
}
`

export const updateReplyDislikeVal = gql
`
mutation updateReplyDislikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){
  updateVideoReplyDislikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){
    userID
    videoID
    replyID
    like
    dislike
  }
}
`

export const updateReplyLike = gql
`
mutation updateLike($replyID: ID!, $like: Boolean!){
	updateReplyLikes(replyID: $replyID, like: $like){
    likes
    dislikes
  }
}
`

export const updateReplyDislike = gql
`
mutation updateDislike($replyID: ID!, $dislike: Boolean!){
	updateReplyDislikes(replyID: $replyID, dislike: $dislike){
    likes
    dislikes
  }
}
`

@Component({
  selector: 'app-video-reply',
  templateUrl: './video-reply.component.html',
  styleUrls: ['./video-reply.component.sass']
})
export class VideoReplyComponent implements OnInit {

  @Input("comment") comment: any
  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  month: number
  Smonth: Number
  replyReplies: any
  thumbnail: string
  user: any
  replyShow: boolean
  totalreplyReplies: number
  replyRepliesShow: boolean
  komen: string

  replyID: any
  userID: any
  videoID: any

  replyVal: any
  like: number
  dislike: number

  likeVal: boolean

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.replyShow = false
    this.replyRepliesShow = false
    this.videoID = parseInt(this.route.snapshot.paramMap.get('id'))
    this.thumbnail = this.user.photoUrl
    this.userID = localStorage.getItem('userID')
    var time = new Date();
    this.month = (time.getMonth() + 1) - this.comment.month
    this.replyID = this.comment.replyID
    this.replyReplies = this.comment.replyReplies
    this.totalreplyReplies = this.replyReplies.length
    this.like = this.comment.likes
    this.dislike = this.comment.dislikes
    this.getReplyVal()
  }

  showReply() : void {
    if(this.replyRepliesShow == false){
      this.replyRepliesShow = true
    }else{
      this.replyRepliesShow = false
    }
  }

  hide(): void {
    if(this.replyShow == false){
      this.replyShow = true
    }else{
      this.replyShow = false
    }
  }

  createReplyReplies(): void {
    let date = new Date()
    if(this.komen != ""){
      this.apollo.mutate({
        mutation: createReplyReplies, variables: {
          userID: this.userID,
          replyID: this.replyID,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          description: this.komen
        }, refetchQueries:[{
          query: getVideo
          , variables:{
            video_id: this.videoID
          }
        }]
      }).subscribe( result=> alert('success input reply'))
    }
  }

  getReplyVal(): void {
    if(this.user == null){
      return
    }
    this.apollo.mutate({
      mutation: getreplyLikeVal, variables: {
        userID: this.userID,
        videoID: this.videoID,
        replyID: this.replyID
      }
    }).subscribe(result => {
      this.replyVal = result.data['createNewVideoReplyLikeVali']
    })
  }

  updateLikeVal(): void {
    if(this.user == null){
      return
    }
    this.apollo.mutate({
      mutation: updateReplyLikeVal, variables: {
        userID: this.userID,
        videoID: this.videoID,
        replyID: this.replyID
      }
    }).subscribe(result => {
      this.replyVal = result.data['updateVideoReplyLikeVali']
      this.apollo.mutate({
        mutation: updateReplyLike, variables: {
          replyID: this.replyID,
          like: this.replyVal.like
        }
      }).subscribe(result => { 
        this.like = result.data['updateReplyLikes']['likes']
      })
    })
  }

  updateDislikeVal(): void {
    if(this.user == null){
      return
    }
    console.log(this.replyID, this.userID, this.videoID)
    this.apollo.mutate({
      mutation: updateReplyDislikeVal, variables: {
        userID: this.userID,
        videoID: this.videoID,
        replyID: this.replyID
      }
    }).subscribe(result => {
      this.replyVal = result.data['updateVideoReplyDislikeVali']
      this.apollo.mutate({
        mutation: updateReplyDislike, variables: {
          replyID: this.replyID,
          dislike: this.replyVal.dislike
        }
      }).subscribe(result => { 
        this.dislike = result.data['updateReplyDislikes']['dislikes']
      })
    })
  }
}
