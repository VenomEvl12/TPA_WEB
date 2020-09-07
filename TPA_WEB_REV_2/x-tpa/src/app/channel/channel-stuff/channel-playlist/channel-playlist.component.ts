import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';

export const retrievePlaylist = gql
`
query retrievePlaylist($userID: ID!){
  playlistsPublic(userID: $userID){
    playlistID
    videoID
    playlistHeader
    totalVideo
    dateAddToPlaylist
    datePublish
  }
}
`

@Component({
  selector: 'app-channel-playlist',
  templateUrl: './channel-playlist.component.html',
  styleUrls: ['./channel-playlist.component.sass']
})
export class ChannelPlaylistComponent implements OnInit {

  constructor(private apollo: Apollo, private router: ActivatedRoute) { }

  channelID: any

  playlists: any

  ngOnInit(): void {
    this.channelID = this.router.snapshot.parent.paramMap.get('id')
    this.getPlaylist()
  }

  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylist, variables: {
        userID: this.channelID
      }
    }).valueChanges.subscribe(result => {
      this.playlists = result.data.playlistsPublic
    })
  }

}
