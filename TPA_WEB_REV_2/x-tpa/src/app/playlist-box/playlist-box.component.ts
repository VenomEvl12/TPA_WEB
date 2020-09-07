import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

export const getVideo = gql
`
query getVideo($videoID: ID!){
  Videos(videoID: $videoID){
    user{
      username
    }
    thumbnail
    title
  }
}
`

export const deleteVideo = gql
`
mutation deleteVideo($userID: ID!, $playlistID: ID!, $videoID: ID!){
  deleteVideo(userID: $userID,playlistID: $playlistID, videoID: $videoID)
}
`

@Component({
  selector: 'app-playlist-box',
  templateUrl: './playlist-box.component.html',
  styleUrls: ['./playlist-box.component.sass']
})
export class PlaylistBoxComponent implements OnInit {

  @Input('video')video: any

  dataVideo: any
  playlistID: any


  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.playlistID = this.route.snapshot.paramMap.get('id')
    this.getVideoAttribute()
  }

  getVideoAttribute(): void{
    this.apollo.watchQuery<any>({
      query: getVideo, variables: {
        videoID: this.video.videoID
      }
    }).valueChanges.subscribe(result => {
      this.dataVideo = result.data.Videos
    })
  }

  deleteVideo(): void {
    console.log(this.video.userID, this.playlistID, this.video.videoID)
    this.apollo.mutate({
      mutation: deleteVideo, variables: {
        userID: this.video.userID,
        playlistID: this.playlistID,
        videoID: this.video.videoID
      }
    }).subscribe(result => {
      alert('success!')
    })
  }


  navigate(): void {
    this.router.navigate(['main/videoPlayer', this.video.videoID])
  }
}
