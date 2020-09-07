import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { Router } from '@angular/router';

export const retrieveThumbnail = gql
`
query retrieveThumbnail($videoID: ID!){
  Videos(videoID: $videoID){
    thumbnail
  }
}
`

@Component({
  selector: 'app-channel-playlist-box',
  templateUrl: './channel-playlist-box.component.html',
  styleUrls: ['./channel-playlist-box.component.sass']
})
export class ChannelPlaylistBoxComponent implements OnInit {

  @Input('playlist')playlist: any

  constructor(private apollo: Apollo, private route: Router) { }

  thumbnail: string

  ngOnInit(): void {
    this.getThumbnail()
  }

  getThumbnail(): void {
    this.apollo.watchQuery<any>({
      query: retrieveThumbnail, variables: {
        videoID: this.playlist.videoID
      }
    }).valueChanges.subscribe(result => { this.thumbnail = result.data.Videos.thumbnail })
  }

  navigate(): void {
    this.route.navigate(['/main/playlist', this.playlist.playlistID])
    window.location.href="/main/playlist/" + this.playlist.playlistID
  }

  

}
