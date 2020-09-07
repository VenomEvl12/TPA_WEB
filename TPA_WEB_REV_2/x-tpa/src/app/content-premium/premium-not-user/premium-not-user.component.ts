import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const getUser = gql
`
query getUser($userID: ID!){
  userById(id: $userID){
    premium
  }
}
`

export const updatePremium = gql
`
mutation updatePremium($userID: ID!, $premium: Boolean!){
  updatePremium(id: $userID ,premium: $premium){
    premium
  }
}
`

export const updatePremiumDay = gql
`
mutation updatePremium($userID: ID!, $premiumDay: Int!){
	updatePremiumCountDay(id: $userID, premiumDayCount: $premiumDay){
    premium
    premiumDayCount
  }
}
`

export const getVideos = gql
`
query getVideos{
  premiumVideos{
    videoID
    user{
      id
      username
      thumbnail
    }
    title
    thumbnail
    views
    descriptions
    sourceLink
    videoLength
    day
    month
    year
  }
}
`

@Component({
  selector: 'app-premium-not-user',
  templateUrl: './premium-not-user.component.html',
  styleUrls: ['./premium-not-user.component.sass']
})
export class PremiumNotUserComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  userID: any

  user: any
  videos: any

  userPremium: boolean

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID')
    this.getUser()
  }

  getUser(): void {
    this.apollo.watchQuery<any>({
      query: getUser, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => { 
      this.user = result.data.userById
      this.userPremium = this.user.premium
      this.checkUser()
    })
  }

  checkUser(): void {
    if(this.userPremium){
      this.getVideos()
    }
  }


  //--------------------------------------------------------------------------------

  upgradeToPremium(): void {
    let bool = confirm('Are you sure ?')
    if(bool){
      this.upgradeUser()
    }else { alert('upgrade to premium failed !') }
  }

  upgradeUser(): void {
    this.apollo.mutate({
      mutation: updatePremium, variables: {
        userID: this.userID,
        premium: true
      }
    }).subscribe(result => {
      this.userPremium = result.data['updatePremium']['premium']
      this.updatePremiumDayCount()
    })
  }

  updatePremiumDayCount(): void {
    let element = document.getElementById('choose-plan') as HTMLSelectElement
    let selected = element.selectedIndex
    let val = element.options[selected].value
    this.apollo.mutate({
      mutation: updatePremiumDay, variables: {
        userID: this.userID,
        premiumDay: val
      }
    }).subscribe(result => {
       alert('your account has been changed to premium !!') 
       window.location.reload()
      })
  }

  getVideos(): void {
    this.apollo.watchQuery<any>({
      query: getVideos
    }).valueChanges.subscribe(result => { this.videos = result.data.premiumVideos })
  }
}
