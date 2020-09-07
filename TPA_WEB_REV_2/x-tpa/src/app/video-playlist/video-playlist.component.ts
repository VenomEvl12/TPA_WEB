import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { getPlaylist } from '../header/header.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { updateSubscribe, updateUserSubscribers } from '../channel/channel.component';
import { retriveChannelSubs, createSubsVal } from '../video-play/video-play.component';


export const retrievePlaylist = gql
`
query retrievePlaylist($playlistID: ID!){
  playlist(playlistID: $playlistID){
    playlistID
    userID
    videoID
    playlistHeader
    playlistType
    description
    views
    totalVideo
  }
}
`

export const updateViews = gql
`
mutation updateViews($playlistID: ID!, $userID: ID!){
  updatePlayListViews(playlistID: $playlistID, userID: $userID){
    views
  }
}
`

export const retrieveVideoPlaylist = gql
`
query retrievePlaylistVideos($playlistID: ID!){
  playlistListVideos(playlistID: $playlistID){
    playlistID
    userID
    videoID
    playlistHeader
    playlistType
    views
    description
    datePublish
    views
    dateAddToPlaylist
  }
}
`

export const retrieveVideo = gql
`
query retrieveVideo($videoID: ID!){
  Videos(videoID: $videoID){
    thumbnail
  }
}
`

export const retrieveUser = gql
`
query retrieveUser($userID: ID!){
  userById(id: $userID){
    username
    id
    subscribers
    thumbnail
  }
}
`

export const updatePriority = gql
`
mutation updatePriority($playlistID: ID!, $userID: ID!, $videoID: ID!, $prio: Int!){
  updatePriorityWeight(playlistID: $playlistID, userID: $userID, videoID: $videoID, priorityWeight: $prio){
    playlistID
    priorityWeight
  }
}
`

export const updateDescription = gql
`
mutation updateDesc($playlistID: ID!, $userID: ID!, $desc: String!){
  updatePlayListDescription(playlistID: $playlistID, userID: $userID, description: $desc){
    description
  }
}
`
export const updateTitle = gql
`
mutation updateHeader($playlistID: ID!, $userID: ID!, $title: String!){
  updatePlayListHeader(playlistID: $playlistID, userID: $userID, header: $title){
    playlistHeader
  }
}
`

export const updateType = gql
`
mutation test($playlistID: ID!, $userID: ID!, $type: Boolean!){
  updatePlaylistType(playlistID: $playlistID, userID: $userID, tipe: $type){
   playlistType
  }
 }
`

export const retrievePlaylistSub = gql
`
mutation retrievePlaylistSub($playlistID: ID!, $userID: ID!){
  createPlaylistSub(input:{
    playlistID: $playlistID
    userID: $userID
  }){
    playlistID
    userID
    subscribe
  }
}
`

export const updatePlaylistSub = gql
`
mutation updatePlaylist($userID: ID!, $playlistID: ID!){
  updatePlaylistSub(userID: $userID, playlistID: $playlistID){
    subscribe
  }
}
`

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.sass']
})


export class VideoPlaylistComponent implements OnInit {

  playlistID: any
  
  playlist: any
  listVideo: any
  user: any
  views: number
  title: string
  desc: string

  playlistType: string
  thumbnail: any

  localuserID: string
  playlistUser: string

  showUpdate: boolean
  showDescription: boolean
  showTitleUpdate: boolean

  constructor(private apollo: Apollo, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit(): void {
   this.playlistID = this.route.snapshot.paramMap.get('id')
   this.showUpdate = false
   this.showDescription = false
   this.showTitleUpdate = false
   this.views = 0
   this.playlistType = "Public"
   this.localuserID = localStorage.getItem('userID')
   this.getPlaylist()
  }

  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylist, variables: {
        playlistID: this.playlistID
      }
    }).valueChanges.subscribe(result => {
      this.playlist = result.data.playlist
      if(this.playlist.playlistType){
        this.playlistType = "Public"
      }else{
        this.playlistType = "Private"
      }
      this.title = this.playlist.playlistHeader
      this.desc = this.playlist.description
      this.apollo.watchQuery<any>({
        query: retrieveUser, variables: {
          userID: this.playlist.userID
        }
      }).valueChanges.subscribe(result => {
        this.user = result.data.userById
        this.playlistUser = this.playlist.userID
        this.channelUserID = this.user.id
        this.getPlaylistVideo()
      })
    })
  }

  updateViews(): void {
    this.apollo.mutate({
      mutation: updateViews, variables:{
        playlistID: this.playlistID,
        userID: this.playlist.userID
      }
    }).subscribe(result => {
      this.views = result.data['updatePlayListViews']['views']
      this.getChannel()
    })
  }

  getPlaylistVideo(): void {
    this.apollo.watchQuery<any>({
      query: retrieveVideoPlaylist, variables: {
        playlistID: this.playlistID
      }
    }).valueChanges.subscribe(result => {
      this.listVideo = result.data.playlistListVideos
      this.obServer = new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting){
          let card = document.querySelector(".card")
          for(let i: number = 0; i < 1 ; i++){
            if(this.lastKey < this.listVideo.length){
              let div = document.createElement('div')
              let vid = document.createElement('app-playlist-box')
              vid.setAttribute("video", "this.listVideo[this.lastKey]")
              div.appendChild(vid)
              card.appendChild(div)
              this.lastKey++
            }
          }
        }
      })
      this.obServer.observe(document.querySelector('.footer'))
      this.apollo.watchQuery<any>({
        query: retrieveVideo, variables: {
          videoID: this.listVideo[0].videoID
        }
      }).valueChanges.subscribe(result => {
         this.thumbnail = result.data.Videos.thumbnail
         this.updateViews()
        })
    })
  }

  //=======================================================================

  showUpdateType(): void {
    if(this.showUpdate){
      this.showUpdate = false
    }else{
      this.showUpdate = true
    }
  }

  showDescriptionUpdate(): void {
    if(this.showDescription){
      this.showDescription = false
    }else{
      this.showDescription = true
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    let logUserID = localStorage.getItem('userID')
    if(logUserID == this.playlist.userID){
      let x = this.listVideo.slice()
      moveItemInArray(x, event.previousIndex, event.currentIndex);
      this.listVideo = x
      this.updatePriorityWeight(event.previousIndex, event.currentIndex)
    }
  }

  updatePriorityWeight(previous: number, after: number): void {
    this.apollo.mutate({
      mutation: updatePriority, variables: {
        playlistID: this.playlistID,
        userID: this.playlist.userID,
        videoID: this.listVideo[after].videoID,
        prio: after + 1
      }
    }).subscribe(
      result => {
        this.apollo.mutate({
          mutation: updatePriority, variables: {
            playlistID: this.playlistID,
            userID: this.playlist.userID,
            videoID: this.listVideo[previous].videoID,
            prio: previous + 1
          }
        }).subscribe()
      }
    )
  }

  updateDesc(): void {
    let string = (document.getElementById('description') as HTMLTextAreaElement).value
    this.apollo.mutate({
      mutation: updateDescription, variables: {
        userID: this.playlist.userID,
        playlistID: this.playlistID,
        desc: string
      }
    }).subscribe(result => {
      this.desc = result.data['updatePlayListDescription']['description']
      alert('success')
    })
  }

  updateTitle(): void {
    let string = (document.getElementById('input-title') as HTMLInputElement).value
     this.apollo.mutate({
       mutation: updateTitle, variables: {
        userID: this.playlist.userID,
        playlistID: this.playlistID,
        title: string
       }
     }).subscribe(result => {
      this.title = result.data['updatePlayListHeader']['playlistHeader']
      alert('success')
     })
  }

  updateType(): void {
    let ty = (document.getElementById('type-choice') as HTMLSelectElement).selectedIndex
    let val = (document.getElementById('type-choice') as HTMLSelectElement).options[ty].value
    let bol
    if(val == "Private"){
      bol = false
    }else{
      bol = true
    }
    this.apollo.mutate({
      mutation: updateType, variables: {
        userID: this.playlist.userID,
        playlistID: this.playlistID,
        type: bol
      }
    }).subscribe(result => {
      if(result.data['updatePlaylistType']['playlistType'] == true){
        this.playlistType = "Public"
      }else{
        this.playlistType = "Private"
      }
      alert('success')
    })
  }

  showTitleUpdateVal(): void {
    if(this.showTitleUpdate){
      this.showTitleUpdate = false
    }else{
      this.showTitleUpdate = true
    }
  }

  channelUserID: any
  channelID: any
  userID: any
  subscribe: boolean
  subscribers: any

  getChannel(): void {
    this.apollo.watchQuery<any>({
      query: retriveChannelSubs, variables: {
        userID: this.channelUserID
      }
    }).valueChanges.subscribe(result => {
      this.channelID = result.data.getChannel.channelID
      if(this.user != null){
        this.userID = localStorage.getItem('userID')
        this.apollo.mutate({
          mutation: createSubsVal, variables: {
            userID: this.userID,
            channelID: this.channelID,
            channelUserID: this.channelUserID
          }
        }).subscribe(result => {
          this.subscribe = result.data['createUserSubscribe']['subscribe']
          if(this.subscribe){
            document.getElementById('button-subs').style.backgroundColor = "#D0CFCF"
            document.getElementById('button-subs').style.color = "#565254"
          }
          if(this.localuserID == this.playlistUser){
            return
          }
          this.getPlaylistSub()
        })
      }
    })
  }

  updateSubscribe(): void {
    this.apollo.mutate({
      mutation: updateSubscribe, variables: {
        userID: this.userID,
        channelID: this.channelID
      }
    }).subscribe(result => {
      this.subscribe = result.data['updateUserSubscribe']['subscribe']
      if(this.subscribe){
        document.getElementById('button-subs').style.backgroundColor = "#D0CFCF"
        document.getElementById('button-subs').style.color = "#565254"
      }else{
        document.getElementById('button-subs').style.backgroundColor = "red"
        document.getElementById('button-subs').style.color = "white"
      }
      this.apollo.mutate({
        mutation: updateUserSubscribers, variables: {
          userID: this.channelUserID,
          bool: this.subscribe
        }
      }).subscribe(result => {
        this.subscribers = result.data['updateSubscribers']['subscribers']
      })
    })
  }

  updateAddToPlaylist(): void {
    this.apollo.mutate({
      mutation: updatePlaylistSub, variables: {
        userID: this.playlistSub.userID,
        playlistID: this.playlistSub.playlistID
      }
    }).subscribe(result => {
      this.playlistSub.subscribe = result.data['updatePlaylistSub']['subscribe']
      if(this.playlistSub.subscribe){
        document.getElementById('button-add-playlist').style.backgroundColor = "#D0CFCF"
        document.getElementById('button-add-playlist').style.color = "#565254"
      }else{
        document.getElementById('button-add-playlist').style.backgroundColor = "blue"
        document.getElementById('button-add-playlist').style.color = "white"
      }
    })
  }

  navigate(): void {
    this.router.navigate(['/main/channel', this.playlistUser, 'home'])
  }

  showSort: boolean = false

  showSortFunc(): void{
    if(this.showSort){
      this.showSort = false
    }else{
      this.showSort = true
    }
  }

  playlistSub: any
  lastKey : number = 4
  obServer: any

  getPlaylistSub(): void {
    if(this.userID == null){
      return
    }
    this.apollo.mutate({
      mutation: retrievePlaylistSub, variables: {
        playlistID: this.playlistID,
        userID: this.userID
      }
    }).subscribe(result => {
      this.playlistSub = result.data['createPlaylistSub']
      if(this.playlistSub.subscribe){
        document.getElementById('button-add-playlist').style.backgroundColor = "#D0CFCF"
        document.getElementById('button-add-playlist').style.color = "#565254"
      }
    })
  }

  sortByViews(): void {
    this.listVideo = this.listVideo.slice().sort((a, b) => (a.views > b.views) ? -1 : 1)
    this.showSort = false
  }

  sortByAddToPlaylist(): void {
    this.listVideo = this.listVideo.slice().sort((a, b) => (a.dateAddToPlaylist > b.dateAddToPlaylist) ? -1 : 1)
    this.showSort = false
  }

  sortByVideoPublish(): void {
    this.listVideo = this.listVideo.slice().sort((a, b) => (a.datePublish > b.datePublish) ? -1 : 1)
    this.showSort = false
  }

  url: any

  copyToClipBoard(): void {
    var dummy = document.createElement('input')
    this.url = window.location.href
    document.body.appendChild(dummy)
    dummy.value = this.url
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
    alert('copied to clipboard !')
  }

  shareModal: boolean = false

  shareModalFunc(): void {
    if(this.shareModal){
      this.shareModal = false
    }else{
      this.shareModal = true
    }
  }

}
