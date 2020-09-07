import { Component, OnInit, Query } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MonthCreator } from "../generateMonth"
import { ActivatedRoute, Router } from '@angular/router'
import { retrieveChannel } from '../search-channel-box/search-channel-box.component';
import { updateSubscribe, updateUserSubscribers } from '../channel/channel.component';

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

export const updateViews = gql
`
  mutation updateViews($videoID: ID!){
    updateViews(VideoID: $videoID){
      videoID
    }
  }
`

export const getVideosList = gql`
query test3($location : String!, $restriction: Boolean!, $premium: Boolean!){
  videoByLocation(location: $location, restriction: $restriction, premium: $premium){
    videoID
    title
    thumbnail
    day
    month
    year
    views
    user{
      username
      premium
    }
  }
}
`

export const getVideoLikeVal = gql
`
mutation createLikeVal($userID: ID!, $videoID: ID!){
  createVideoLikeVali(input:{
    userID: $userID
    videoID: $videoID
  }){
    userID
		videoID
    like
    dislike
  }
}
`

export const videoLike = gql
`
  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){
    updateLike(VideoID: $VideoID, likeVal: $likeVal){
      videoID
      like
      dislike
    }
  }
`

export const videoLikeValUpdate = gql
`
  mutation videoLikeValUpdate($videoID : ID!, $userID: ID!){
    updateVideoLikeVali(videoID: $videoID, userID: $userID){
      userID
      videoID
      like
      dislike
    }
  }
`

export const videoDislike = gql
`
  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){
    updateDislike(VideoID: $VideoID, likeVal: $likeVal){
      videoID
      like
      dislike
    }
  }
`

export const videoDislikeValUpdate = gql
`
  mutation videoLikeValUpdate($videoID: ID!, $userID: ID!){
    updateVideoDislikeVali(videoID: $videoID, userID: $userID){
      userID
      videoID
      like
      dislike
    }
  }
`

export const createReply = gql
`
mutation createReply($userID: ID!, $videoID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){
  createVideoReply(input:{
    userID: $userID
    videoID: $videoID
    day: $day
    month: $month
    year: $year
    description: $description
  }){
    user{
      id
      thumbnail
      username
    }
    replyID
    likes
    day
    month
    year
    dislikes
    description
    replyReplies{
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
`

export const retrievePlaylist = gql
`
query getPlaylist($userID: ID!){
  playlists(userID: $userID){
    playlistID
    playlistHeader
  }
}
`

export const insertVideoToPlaylist = gql
`
mutation insertToPlaylist($playlistID: ID!, $userID: ID!, $videoID: ID!){
  inputVideoToPlayList(input:{
    playlistID: $playlistID
    userID: $userID
    videoID: $videoID
  }){
    playlistID
  }
}
`

export const createPlaylist = gql
`
mutation insertToPlaylist($userID: ID!, $title: String!, $type: Boolean!, $desc: String!){
  createPlaylist(input:{
    userID: $userID
    playlistHeader: $title
    playlistType: $type
    description: $desc
  }){
    playlistID
  }
}
`

export const retriveChannelSubs = gql
`
query getChannel($userID: ID!){
  getChannel(userID: $userID){
    channelID
  }
}
`

export const createSubsVal = gql
`
mutation createSubs($userID: ID!, $channelID: ID!, $channelUserID: ID!){
  createUserSubscribe(input:{
    userID: $userID
    channelID: $channelID
    channelUserID: $channelUserID
  }){
    subscribe
  }
}
`

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.sass']
})
export class VideoPlayComponent implements OnInit {

  video: any
  date : string
  month : string
  replies : any
  totalComment : number
  suggestion : any
  id: number
  userID: number
  likeVal: any
  user: any
  thumbnail: any
  
  like: number
  dislike: number

  premium: boolean
  restriction: boolean
  location: string

  subscribers: number
  commentkey: number = 4
  lastKey : number = 0
  obServer: any
  commentObserver: any
  autoPlay: boolean

  subscribe: any
  channelID: any
  channelUserID: any
  views: any

  constructor(private apollo: Apollo, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem('userID'))
    this.user = JSON.parse(localStorage.getItem('user'))
    this.lastKey = 16
    this.showOption = false
    if(this.user == null){
      this.location = "Jepang"
      this.premium = false
      this.restriction = true
    }else{
      this.location = localStorage.getItem('location')
      this.premium = JSON.parse(localStorage.getItem('premium'))
      this.restriction = JSON.parse(localStorage.getItem('restriction'))
    }
    if(this.user != null){
      this.thumbnail = this.user.photoUrl
      this.getPlaylist()
    }
    this.autoPlay = JSON.parse(localStorage.getItem('autoPlay'))
    if(this.autoPlay == true){
      this.AutoPlay()
      var doc = (document.getElementById('autoplayVal') as HTMLInputElement)
      doc.checked = true
    }
    this.AutoPlayCheck()
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.apollo.mutate({
      mutation: updateViews, variables: {
        videoID: this.id
      }
    }).subscribe()
    this.apollo.watchQuery<any>({
        query: getVideo,
        variables: {
          video_id: this.id
        }
      }
    ).valueChanges.subscribe(result => {
      this.video = result.data.Videos
      var monGen = new MonthCreator()
      this.month = monGen.createMonth(this.video.month)
      this.date = this.month.substring(0, 3) + " " + this.video.day + ", " + this.video.year
      this.replies = result.data.Videos.videoReply
      this.totalComment = this.replies.length
      this.like = this.video.like
      this.channelUserID = this.video.user.id
      this.dislike = this.video.dislike
      console.log(this.video.views)
      this.views = this.getformat(this.video.views)
      this.subscribers = this.video.user.subscribers
      this.getChannel()
      this.commentObserver = new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting){
          let card = document.querySelector(".card")
          for(let i: number = 0; i < 4 ; i++){
            if(this.commentkey < this.replies.length){
              let div = document.createElement('div')
              let vid = document.createElement('app-video-reply')
              vid.setAttribute("comment", "this.replies[this.lastKey]")
              div.appendChild(vid)
              card.appendChild(div)
              this.commentkey++
            }
          }
        }
      })
      this.commentObserver.observe(document.querySelector('.footer'))      
    })

    this.apollo.watchQuery<any>({
      query: getVideosList, variables: {
        location: this.location,
        restriction: this.restriction,
        premium: this.premium
      }
    }).valueChanges.subscribe(result => {
      this.suggestion = result.data.videoByLocation
      this.obServer = new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting){
          let card = document.querySelector(".card")
          for(let i: number = 0; i < 4 ; i++){
            if(this.lastKey < this.suggestion.length){
              let div = document.createElement('div')
              let vid = document.createElement('app-video-play-list')
              vid.setAttribute("suggetion", "this.suggetion[this.lastKey]")
              div.appendChild(vid)
              card.appendChild(div)
              this.lastKey++
            }
          }
        }
      })
      this.obServer.observe(document.querySelector('.footer'))
    })
    this.getLikeVal()
  }  

  getLikeVal(): void{
    if(this.user == null){
      return
    }
    this.apollo.mutate({
      mutation: getVideoLikeVal, variables: {
        userID: this.userID,
        videoID: this.id
      }
    }).subscribe(result => {
      this.likeVal = result.data['createVideoLikeVali']
    })
  }

  getChannel(): void {
    this.apollo.watchQuery<any>({
      query: retriveChannelSubs, variables: {
        userID: this.channelUserID
      }
    }).valueChanges.subscribe(result => {
      this.channelID = result.data.getChannel.channelID
      if(this.user != null){
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

// ------------------------------------------------------------------------------

  likeVideoVal(): void {
    if(this.user == null){
      return
    }
    this.apollo.mutate({
      mutation: videoLikeValUpdate, variables: {
        userID: this.userID,
        videoID: this.id
      }
    }).subscribe(result => {
      this.likeVal = result.data['updateVideoLikeVali']
      let vidLike = this.likeVal.like
      if(vidLike == false){
        vidLike = true
      }else {
        vidLike = false
      }
      this.apollo.mutate({
        mutation: videoLike, variables: {
           VideoID: this.id,
           likeVal: vidLike
        }
      }).subscribe(result => {
        this.like = result.data['updateLike']['like']
      })
    })
  }

  dislikeVideoVal(): void {
    if(this.user == null){
      return
    }
    this.apollo.mutate({
      mutation: videoDislikeValUpdate, variables: {
        userID: this.userID,
        videoID: this.id
      }
    }).subscribe(result => {
      this.likeVal = result.data['updateVideoDislikeVali']
      let vidLike = this.likeVal.dislike
      if(vidLike == false){
        vidLike = true
      }else {
        vidLike = false
      }
      this.apollo.mutate({
        mutation: videoDislike, variables: {
           VideoID: this.id,
           likeVal: vidLike
        }
      }).subscribe(result => {
        this.dislike = result.data['updateDislike']['dislike']
      })
    })
  }

  createVideoReply(): void {
    var element = document.getElementById('input-rep')
    let inp = (element as HTMLInputElement).value
    let date = new Date()
    if(inp != ""){
      this.apollo.mutate({
        mutation: createReply, variables: {
          userID: this.userID,
          videoID: this.id,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          description: inp
        }, refetchQueries:[{
          query: getVideo
          , variables:{
            video_id: this.id
          }
        }]
      }).subscribe( result => alert("insert Success"))
    }
  }

  showOption: boolean
  showPlaylistModal: boolean = false


  showOptionFunc(): void {
    if(this.showOption){
      this.showOption = false
    }else{
      this.showOption = true
    }
  }

  showPlaylistModalFunc(): void {
    if(this.showPlaylistModal){
      this.showPlaylistModal = false
    }else{
      this.showPlaylistModal = true
      this.showOption = false
    }
  }

  playlists: any
  
  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylist, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
      this.playlists = result.data.playlists
    })
  }

  inputToPlaylist(playlistID: number): void {
    this.apollo.mutate({
      mutation: insertVideoToPlaylist, variables: {
        userID: this.userID,
        videoID: this.route.snapshot.paramMap.get('id'),
        playlistID: playlistID
      }
    }).subscribe(result => { alert('success !')})
  }

  showInputNewPlaylist: boolean = false

  showInputNewPlaylistFunc(): void {
    if(this.showInputNewPlaylist){
      this.showInputNewPlaylist = false
    }else{
      this.showInputNewPlaylist = true
    }
  }

  createNewPlaylist(): void {
    var title = (document.getElementById('p-title') as HTMLInputElement).value
    var typeIdx = (document.getElementById('p-type') as HTMLSelectElement).selectedIndex
    let bool: boolean
    if(typeIdx == 0){
      bool = true
    }else{
      bool = false
    }
    let desc = (document.getElementById('p-desc') as HTMLTextAreaElement).value
    if(title == "" || desc == ""){
      return
    }
    this.apollo.mutate({
      mutation: createPlaylist, variables: {
        userID: this.userID,
        title: title,
        type: bool,
        desc: desc
      }
    }).subscribe(result => {
      alert('create Playlist Success !')
      let playlistID = result.data['createPlaylist']['playlistID']
      console.log(playlistID)
      this.inputToPlaylist(playlistID)
    })
  }

  bools: boolean = false

  videox: any

  hotkeys(){
    this.videox = (document.getElementById('video-play') as HTMLVideoElement)
    var audio_element = this.videox;
    this.bools = true;
    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 38:
              event.preventDefault();
              var audio_vol = (audio_element).volume;
              if (audio_vol!=1) {
                try {
                    var x = audio_vol + 0.02;
                    audio_element.volume = x;
                  }
                catch(err) {
                    audio_element.volume = 1;
                }
              }
            break;
        case 40:
              event.preventDefault();
              audio_vol = audio_element.volume;
              if (audio_vol!=0) {
                try {
                  var z = audio_vol - 0.02;
                  audio_element.volume = z;
                }
                catch(err) {
                    audio_element.volume = 0;
                }
              }
            break;
          case 74:
            event.preventDefault();
            audio_element.currentTime -= 10;
              break;
          case 75:
            event.preventDefault();
            audio_element.paused == false ? audio_element.pause() : audio_element.play();
            break;
          case 76:
            event.preventDefault();
            audio_element.currentTime += 10;
              break;
          case 70:
            event.preventDefault();
            if ((document.getElementById('video-play')).requestFullscreen) {
              (document.getElementById('video-play')).requestFullscreen();
            }
      }
    }
  }

  showSort: boolean = false

  showSortFunc(): void {
    if(this.showSort){
      this.showSort = false
    }else{
      this.showSort = true
    }
  }

  sortByLike(): void {
    this.replies = this.replies.slice().sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  }

  sortByDate(): void {
    this.replies = this.replies.slice().sort((a, b) => (a.year > b.year) ? -1 : 1)
    this.replies = this.replies.slice().sort((a, b) => (a.month > b.month) ? -1 : 1)
    this.replies = this.replies.slice().sort((a, b) => (a.day > b.day) ? -1 : 1)
  }

  changePlayer(): void {
    let x = +this.video.videoID + 1
    this.router.navigate(['/main/videoPlayer', this.video.videoID])
    window.location.href="/main/videoPlayer/" + x
  }

  shareModal: boolean = false

  shareModalFunc(): void {
    if(this.shareModal){
      this.shareModal = false
    }else{
      this.shareModal = true
    }
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


  AutoPlayCheck(): void {
    let val = (document.getElementById('autoplayVal') as HTMLInputElement).checked
    localStorage.setItem('autoPlay', JSON.stringify(val))
    if(val == true){
      this.autoPlay = true
      this.AutoPlay()
    }else{
      this.autoPlay = false
    }
  }

  AutoPlay(): void{
    if(this.autoPlay != true){
      return
    }
    let element = document.getElementById('video-play') as HTMLVideoElement
    element.onended = () => {
      let href = this.id + 1
      this.router.navigate(['/main/videoPlayer', this.id])
      window.location.href = "/main/videoPlayer/" + href
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
