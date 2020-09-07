import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';


export const getChannel = gql
`
mutation getChannel($userID: ID!, $location: String!, $channelImage: String!){
  createChannel(input:{
    userID: $userID
    location: $location
    channelImage: $channelImage
  }){
    channelID
    userID
    viewCount
    location
    channelDescription
    channelImage
    channelBanner
  }
}
`

export const mutateSubscribe = gql
`
mutation createSubscribe($userID: ID!, $channelID: ID!, $channelUserID: ID!){
	createUserSubscribe(input:{
    userID: $userID
    channelID: $channelID
    channelUserID: $channelUserID
  }){
    userID
    channelID
    subscribe
  }
}
`

export const updateSubscribe = gql
`
mutation updateSubscriber($userID: ID!, $channelID: ID!){
  updateUserSubscribe(userID: $userID, channelID: $channelID){
    userID
    channelID
    subscribe
  }
}
`

export const updateUserSubscribers = gql
`
mutation updateSubscriber($userID: ID!, $bool: Boolean!){
  updateSubscribers(id: $userID, subscribe: $bool){
    subscribers
  }
}
`

export const getUser = gql
`
query getUser($userID: ID!){
  userById(id: $userID){
    thumbnail
    username
    subscribers
  }
}
`

export const updateChannelBanner = gql
`
mutation updateBanner($channelID: ID!, $channelBanner: String!){
  updateChannelBanner(channelID: $channelID, channelBanner: $channelBanner){
    channelID
  }
}
`

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.sass']
})
export class ChannelComponent implements OnInit {

  userID: any
  userThumbnail: any
  userSubscribers: any
  username: any
  userIDFromLocal: any

  channel: any

  subscribeVal: boolean

  constructor(private apollo: Apollo, private router: ActivatedRoute, private route: Router, private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.userID = this.router.snapshot.paramMap.get('id')
    this.userIDFromLocal = localStorage.getItem('userID')
    this.getUser()
  }

  changeColor(): void {
    let element = (document.getElementById('button-subs') as HTMLButtonElement)
    if(this.subscribeVal){
      element.style.backgroundColor = "rgb(230, 230, 230)"
      element.style.color = "rgb(100, 100, 100)"
    }else{
      element.style.backgroundColor = "red"
      element.style.color = "white"
    }
  }


  onSelect(x: string): void {
    this.route.navigate(['/main/channel', this.userID, x])
  }
  
  getUser(): void {
    this.apollo.watchQuery<any>({
      query: getUser, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
        this.userThumbnail = result.data.userById.thumbnail
        this.username = result.data.userById.username
        this.userSubscribers = result.data.userById.subscribers
        this.mutate()
    })
  }
  mutate(): void {
    this.apollo.mutate({
      mutation: getChannel, variables: {
        userID: this.userID,
        location: "Indonesia",
        channelImage: this.userThumbnail
      }
    }).subscribe(result => {
      this.channel = result.data['createChannel']
      this.getUserSubscribe()
    })
  }

  getUserSubscribe(): void {
    if(this.userIDFromLocal == null){
      return
    }
    this.apollo.mutate({
      mutation: mutateSubscribe, variables: {
        userID: this.userIDFromLocal,
        channelID: this.channel.channelID,
        channelUserID: this.userID
      }
    }).subscribe(result =>{
      this.subscribeVal = result.data['createUserSubscribe']['subscribe']
      this.changeColor()
    })
  }

  updateSubscribe(): void {
    if(this.userIDFromLocal == null){
      return
    }
    this.apollo.mutate({
      mutation: updateSubscribe, variables: {
        userID: this.userIDFromLocal,
        channelID: this.channel.channelID
      }
    }).subscribe(result => {
      this.subscribeVal = result.data['updateUserSubscribe']['subscribe']
      this.apollo.mutate({
        mutation: updateUserSubscribers, variables: {
          userID: this.userID,
          bool: this.subscribeVal
        }
      }).subscribe(result => {
        this.userSubscribers = result.data['updateSubscribers']['subscribers']
        this.changeColor()
      })
    })
  }

  bannerModal: boolean = false

  bannerModalFunc(): void {
    if(this.bannerModal){
      this.bannerModal = false
      return
    }
    this.bannerModal = true
  }

  task: AngularFireUploadTask;
  image: File
  thumbnailURL: string

  uploadImage(files: FileList){
    this.image = files.item(0)
    const path = `banner/${Date.now()}_${this.image.name}`
    const ref = this.storage.ref(path)
    this.task = this.storage.upload(path, this.image)
    this.task.snapshotChanges().pipe(
      finalize( async() => {
        this.thumbnailURL = await ref.getDownloadURL().toPromise();
      })
    ).subscribe(url => {
      if(url){
        console.log(url)
      }
    })
  }

  updateChannelBannerFunc(): void {
    if(this.thumbnailURL != null){
      this.apollo.mutate({
        mutation: updateChannelBanner, variables: {
          channelID: this.channel.channelID,
          channelBanner: this.thumbnailURL
        }
      }).subscribe(result => { window.location.reload() })
    }
  }
}
