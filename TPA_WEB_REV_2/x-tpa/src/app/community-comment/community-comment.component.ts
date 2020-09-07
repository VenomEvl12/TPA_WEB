import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getComment } from '../channel/channel-stuff/community/community.component';

export const mutateLikeVal = gql
`
mutation createCommunityVal($userID: ID!, $communityID: ID!){
  createChannelCommunityVali(input:{
    userID: $userID
    CommunityID: $communityID
  }){
    CommunityValiID
  }
}
`

export const updateLikeVal = gql
`
mutation updateLike($comValID: ID!){
  updateChannelCommunityValiLike(communityValiID: $comValID){
    like
    dislike
  }
}
`

export const updateDislikeVal = gql
`
mutation updateLike($comValID: ID!){
  updateChannelCommunityValiDislike(communityValiID: $comValID){
    like
    dislike
  }
}
`

export const updateLike = gql
`
mutation updateLike($communityID: ID!, $like: Boolean!){
  updateChannelCommunitiesLike(communityID: $communityID, like: $like){
    like
  }
}
`

export const updateDislike = gql
`
mutation updateDisike($communityID: ID!, $dislike: Boolean!){
  updateChannelCommunitiesDislike(communityID: $communityID, dislike: $dislike){
    dislike
  }
}
`

export const deleteComment = gql
`
mutation deleteCommunity($communityID: ID!){
  deleteChannelCommunities(communityID: $communityID)
}
`

export const getComments = gql
`
query getComment($channelID: ID!){
  channelCommunities(channelID: $channelID){
    communityID
    channelID
		comDescription
    like
    dislike
    day
    month
    year
    user{
      id
      username
      thumbnail
    }
  }
}

`

@Component({
  selector: 'app-community-comment',
  templateUrl: './community-comment.component.html',
  styleUrls: ['./community-comment.component.sass']
})
export class CommunityCommentComponent implements OnInit {

  @Input('comment') comment: any

  hideB: boolean
  userID: any
  localUserID: any

  likeVal: any

  like: number
  dislike: number

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.hideB = false
    this.userID = this.comment.user.id
    this.localUserID = localStorage.getItem('userID')
    this.like = this.comment.like
    this.dislike = this.comment.dislike
    this.getlikeVal()
  }

  hide(): void {
    if(this.hideB == false){
      this.hideB = true
    }else{
      this.hideB = false
    }
  }

  getlikeVal(): void{
    if(this.localUserID == null){
      return
    }
    this.apollo.mutate({
      mutation: mutateLikeVal, variables: {
        userID: this.localUserID,
        communityID: this.comment.communityID
      }
    }).subscribe(result => {
      this.likeVal = result.data['createChannelCommunityVali']
    })
  }

  updateLike(): void {
    if(this.localUserID == null){
      return
    }
    this.apollo.mutate({
      mutation: updateLikeVal, variables: {
        comValID: this.likeVal.CommunityValiID
      }
    }).subscribe(result => {
      let likeValidation = result.data['updateChannelCommunityValiLike']['like']
      console.log(likeValidation)
      this.apollo.mutate({
        mutation: updateLike, variables: {
          communityID: this.comment.communityID,
          like: likeValidation
        }
      }).subscribe(result => {
          this.like = result.data['updateChannelCommunitiesLike']['like']
      })
    })
  }

  updateDislike(): void {
    if(this.localUserID == null){
      return
    }
    this.apollo.mutate({
      mutation: updateDislikeVal, variables: {
        comValID: this.likeVal.CommunityValiID
      }
    }).subscribe(result => {
      let likeValidation = result.data['updateChannelCommunityValiDislike']['dislike']
      this.apollo.mutate({
        mutation: updateDislike, variables: {
          communityID: this.comment.communityID,
          dislike: likeValidation
        }
      }).subscribe(result => {
          this.dislike = result.data['updateChannelCommunitiesDislike']['dislike']
      })
    })
  }

  deleteCommunity(): void {
    this.apollo.mutate({
      mutation: deleteComment, variables: {
        communityID: this.comment.communityID
      }, refetchQueries:[{
        query: getComments, variables: {
          channelID: this.comment.channelID
        }
      }]
    }).subscribe(result => { alert("success delete !")})
  }
}
