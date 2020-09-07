import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

export const retrieveUser = gql
`
query getUser($userID: ID!){
  userById(id: $userID){
    username
  }
}
`

export const retrieveVideo = gql
`
query getUser($videoID: ID!){
  Videos(videoID: $videoID){
    thumbnail
  }
}
`

@Component({
  selector: 'app-search-playlist-box',
  templateUrl: './search-playlist-box.component.html',
  styleUrls: ['./search-playlist-box.component.sass']
})
export class SearchPlaylistBoxComponent implements OnInit {

  @Input('playlist')playlist: any
  username: string
  thumbnail: any

  constructor(private apollo: Apollo, private route: Router) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.apollo.watchQuery<any>({
      query: retrieveUser, variables: {
        userID: this.playlist.userID
      }
    }).valueChanges.subscribe(result => { 
      this.username = result.data.userById.username
      this.getVideo()
     } )
  }

  getVideo(): void {
    this.apollo.watchQuery<any>({
      query: retrieveVideo, variables: {
        videoID: this.playlist.videoID
      }
    }).valueChanges.subscribe(result => { 
      this.thumbnail = result.data.Videos.thumbnail
     } )
  }

  navigate(): void {
    this.route.navigate(['/main/playlist', this.playlist.playlistID])
  }
}
