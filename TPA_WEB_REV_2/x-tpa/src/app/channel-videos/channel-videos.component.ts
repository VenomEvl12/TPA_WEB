import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

export const getVideos = gql
`
query getVideos($userID: ID!, $restriction: Boolean!, $premium: Boolean!){
	videoByUser(userID: $userID, restriction: $restriction, premium: $premium){
    videoID
    title
    thumbnail
    views
    day
    month
    year
    descriptions
    sourceLink
    user{
      id
      username
      thumbnail
      premium
    }
  }
}
`

export const retrieveAllVideos = gql
`
query retrieveAllVideos($userID: ID!){
  retrieveAllVideos(userID: $userID){
    videoID
    title
    thumbnail
    views
    day
    month
    year
    descriptions
    sourceLink
    typePub
    user{
      id
      username
      thumbnail
      premium
    }
  }
}
`

export const updateVideo = gql
`
mutation updateVideo($videoID: ID!, $desc: String!, $title: String!, $thumbnail: String!, $privacy: Boolean!){
  updateVideo(VideoID: $videoID, desc: $desc, title: $title, thumbnail: $thumbnail, privacy: $privacy){
    videoID
    title
    thumbnail
    views
    day
    month
    year
    descriptions
    sourceLink
    typePub
    user{
      id
      username
      thumbnail
      premium
    }
  }
}
`

@Component({
  selector: 'app-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.sass']
})
export class ChannelVideosComponent implements OnInit {
  

  constructor(private apollo: Apollo, private route: ActivatedRoute,  private db: AngularFirestore, private storage: AngularFireStorage) { }

  userID: any
  res: boolean
  premium: boolean
  lastKey : number = 0
  obServer: any
  thumbnailURL: string

  showModal: boolean = false

  localuserID: any

  videos: any

  ngOnInit(): void {
    this.userID = this.route.snapshot.parent.paramMap.get('id')
    this.res = JSON.parse(localStorage.getItem('restriction'))
    this.premium = JSON.parse(localStorage.getItem('premium'))
    this.localuserID = localStorage.getItem('userID')
    if(this.res == null){
      this.res = true
      this.premium = false
    }else{
      this.res = false
      this.premium = false
    }
    this.lastKey = 12
    if(this.userID == this.localuserID){
      this.getAllVideos()
    }else{
      this.getVideos()
    }
  }

  getVideos(): void{
    console.log(this.userID, this.res, this.premium, true)
    this.apollo.watchQuery<any>({
      query: getVideos, variables: {
        userID: this.userID,
        restriction: this.res,
        premium: this.premium
      }
    }).valueChanges.subscribe(result =>{
      this.videos = result.data.videoByUser
      this.infiniteScroll()
    })
  }

  getAllVideos(): void {
    this.apollo.watchQuery<any>({
      query: retrieveAllVideos, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result =>{
      this.videos = result.data.retrieveAllVideos
      this.infiniteScroll()
    })
  } 

  showModalFunc(): void {
    if(this.showModal){
      this.showModal = false
      return
    }
    this.showModal = true
  }

  sortByViews(): void {
    this.videos = this.videos.slice().sort((a, b) => (a.views > b.views) ? -1 : 1)
    this.showModal = false
  }

  sortByOldest(): void {
    this.videos = this.videos.slice().sort((a, b) => (a.year > b.year) ? 1 : -1)
    this.videos = this.videos.slice().sort((a, b) => (a.month > b.month) ? 1 : -1)
    this.videos = this.videos.slice().sort((a, b) => (a.day > b.day) ? 1 : -1)
    this.showModal = false
  }
  sortByNewest(): void {
    this.videos = this.videos.slice().sort((a, b) => (a.year > b.year) ? -1 : 1)
    this.videos = this.videos.slice().sort((a, b) => (a.month > b.month) ? -1 : 1)
    this.videos = this.videos.slice().sort((a, b) => (a.day > b.day) ? -1 : 1)
    this.showModal = false
  }

  infiniteScroll(): void {
    this.obServer = new IntersectionObserver((entry) => {
      if(entry[0].isIntersecting){
        let card = document.querySelector(".cards")
        for(let i: number = 0; i < 4 ; i++){
          if(this.lastKey < this.videos.length){
            let div = document.createElement('span')
            let vid = document.createElement('app-video-box')
            vid.setAttribute("video", "this.videos[this.lastKey]")
            div.appendChild(vid)
            card.appendChild(div)
            this.lastKey++
          }
        }
      }
    })
    this.obServer.observe(document.querySelector('.footersss'))
  }

  videoID: any

  showUpdateVideo(): void{
    let id = this.videoID
    let title = (document.getElementById('title') as HTMLInputElement).value
    let desc = (document.getElementById('desc') as HTMLTextAreaElement).value
    let idx = (document.getElementById('privacy') as HTMLSelectElement).selectedIndex
    let privacy = (document.getElementById('privacy') as HTMLSelectElement).options[idx].value
    let bol
    if(privacy == "Public"){
      bol = true
    }else{
      bol = false
    }
    let url: string = this.thumbnailURL
    if(title == null || desc == null || privacy == null || url == null){
      alert('insert input !')
    }else{
      this.apollo.mutate({
        mutation: updateVideo, variables:{
          videoID: this.videoID,
          desc: desc,
          title: title,
          thumbnail: this.thumbnailURL,
          privacy: bol
        }
      }).subscribe(result => {
        alert('success update video !')
      })
    }
  }

  image: File
  task: AngularFireUploadTask;

  uploadImage(files: FileList){
    this.image = files.item(0)
    const path = `thumbnail/${Date.now()}_${this.image.name}`
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

  updateModal: boolean = false

  updateModalF(): void {
    if(this.updateModal){
      this.updateModal = false
    }else{
      this.updateModal = true
    }
  }

  updateModalFunc($event):void{
    this.updateModal = $event
  }

  

  videoIDUpdate($event):void {
    this.videoID = $event
  }
}
