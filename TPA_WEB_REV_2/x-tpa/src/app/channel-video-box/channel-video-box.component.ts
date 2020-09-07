import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag'

export const insertToPlaylist = gql
`
mutation insertToPlaylist($userID: ID!, $playlistID: ID!, $videoID: ID!){
  inputVideoToPlayList(input:{
    userID: $userID
    playlistID: $playlistID
    videoID: $videoID
  }){
    playlistHeader
  }
}

`

export const retrieveFromPlaylist = gql
`
query getPlaylist($userID: ID!){
  playlists(userID: $userID){
    playlistHeader
    playlistID
  }
}
`

export const deleteVideo = gql
`
mutation updateVideo($videoID: ID!){
	removeVideo(VideoID: $videoID)
}
`

@Component({
  selector: 'app-channel-video-box',
  templateUrl: './channel-video-box.component.html',
  styleUrls: ['./channel-video-box.component.sass']
})
export class ChannelVideoBoxComponent implements OnInit {

  @Output() VideoID = new EventEmitter<any>()
  @Output() ShowModal = new EventEmitter<boolean>()
 
  constructor(private apollo: Apollo, private router: Router) { }

  showSetting:boolean

  @Input('video')video: any

  userID: any

  playlistTitles: any

  showModal: boolean

  views: any

  ngOnInit(): void {
    this.showSetting = false
    this.userID = localStorage.getItem('userID')
    this.showModal = false
    this.views = this.getformat(this.video.views)
    if(this.userID != null){
      this.getPlaylist()
    }
  }


  hide(): void{
    if(this.showSetting == false){
      this.showSetting = true
    }
    else{
      this.showSetting = false
    }  
  }

  onSelect(): void{
    this.router.navigate(['/main/videoPlayer', this.video.videoID])
  }

  onSelectUser(): void{
    this.router.navigate(['main/channel', this.video.user.id, 'home'])
  }

  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrieveFromPlaylist, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result =>{
      this.playlistTitles = result.data.playlists
    })
  }

  clickPlaylist(playlistID: string): void {
    if(this.userID == null){
      return
    }
    let bool = confirm("are you sure insert this to playlist ?")
    if(bool){
      this.apollo.mutate({
        mutation: insertToPlaylist, variables: {
          userID: this.userID,
          playlistID: playlistID,
          videoID: this.video.videoID
        }
      }).subscribe(result => { 
        alert('insert to playlist success !')
        window.location.reload()
      })
    }else{
      alert('cancel insert to playlist')
    }
  }

  showPlaylistModal(): void {
    if(this.showModal){
      this.showModal = false
    }else{
      this.showModal = true
    }
  }

  updateModalFunc(): void {
    this.ShowModal.emit(true)
    this.VideoID.emit(this.video.videoID)
  }

  deleteVideo(): void {
    if(confirm("Are you sure delete this video ?")){
      this.apollo.mutate({
        mutation: deleteVideo, variables: {
          videoID: this.video.videoID
        }
      }).subscribe(result => {
        window.location.reload()
      })
    }
  }

  getformat(view: number){
    let number = view
    if(number == 0) {
    return 0;
    }   
    else
    {        
      // hundreds
      if(number <= 999){
        return number ;
      }
      // thousands
      else if(number >= 1000 && number <= 999999){
        
        return Math.floor((number / 1000)) + 'K';
      }
      // millions
      else if(number >= 1000000 && number <= 999999999){
        return Math.floor((number / 1000000)) + 'M';
      }
      // billions
      else if(number >= 1000000000 && number <= 999999999999){
        return Math.floor((number / 1000000000)) + 'B';
      }
      else
        return number ;
      }
    }
}
