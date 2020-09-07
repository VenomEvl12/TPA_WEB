import { Component, OnInit, Injectable } from '@angular/core';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Apollo } from 'apollo-angular';
import { SocialUser } from "angularx-social-login";
import gql from 'graphql-tag';
import { BehaviorSubject, Observable, merge, zip } from 'rxjs';
import { DataServiceService } from "../data-service.service";
import { Router } from '@angular/router';
import { type } from 'os';
import { debounceTime, switchMap, map, delay } from 'rxjs/operators';
import { retrievePlaylist } from '../trending-list/trending-list.component';

export const mutateUser = gql`
  mutation reply($email: String!, $username: String!, $thumbnail: String!, $location: String!) {
    createUser(input:{
      email: $email
      username: $username
      location: $location
      thumbnail: $thumbnail
    }){
      id
      location
      restriction
      premium
    }
  }
`

export const updateLocation = gql`
  mutation updateLocation($id: ID!, $location: String!){
    updateLocation(id: $id, location: $location){
    id
  }
}
`

export const updateRestriction = gql`
  mutation updateRestriction($id: ID!, $restriction: Boolean!){
    updateRestrictionUser(id: $id, restriction: $restriction){
    id
  }
}
`

export const mutatePlaylist = gql
`
mutation createPlaylist($userID: ID!, $title: String!, $type: Boolean!, $description: String!){
  createPlaylist(input:{
    userID: $userID
    playlistHeader: $title
    playlistType: $type
    description: $description
  }){
    playlistID
  }
}
`

export const getPlaylist = gql
`
query getPlaylist($userID: ID!){
  playlists(userID: $userID){
    playlistHeader
    playlistID
  }
}
`

export const getSuggestion = gql
`
query totalVideo($keyword: String!){
  getVideoByKeywordTopFive(keyword: $keyword){
    title
  }
}
`

export const getChannelSubscribe = gql
`
query retriveSubscribe($userID: ID!){
  getChannelSubscribe(userID: $userID){
    channelUserID
  }
}
`

export const getUser = gql
`
query retriveUser($userID: ID!){
	userById(id: $userID){
    id
    username
    thumbnail
  }
}
`

export const retrievePlaylistSub = gql
`
query retrievePlaylistSub($userID: ID!){
  retrieveAllPlaylistSubs(userID: $userID){
    playlistID
  }
}
`

export const retrievePlaylistFromSub = gql
`
query retrievePlaylistSub($playlistID: ID!){
	playlist(playlistID: $playlistID){
    playlistHeader
    playlistID
  }
}
`

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

@Injectable()
export class HeaderComponent implements OnInit {

  constructor(private authService: SocialAuthService, private apollo: Apollo, private data: DataServiceService, private route: Router) { }

  message: string  

  user: SocialUser
  loggedIn: boolean
  listUsers: any
  dataSize : number
  restrictMode: boolean
  boolCreatePlaylist: boolean
  userID: any

  videos: any
  loca: string
  lastKey: number = 10

  suggestion: any

  playlist: any
  playlists: any=[]

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.restrictMode = JSON.parse(localStorage.getItem('restriction'))
    this.loca = localStorage.getItem('location')
    this.keywordx = ""
    this.userID = localStorage.getItem('userID')
    this.boolCreatePlaylist = false
    if(this.user == null){
      this.restrictMode = true
      this.loca = "Jepang"
    }else{
      this.getListPlaylist()
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      localStorage.setItem("user", JSON.stringify(this.user))
          this.apollo.mutate({
            mutation: mutateUser, variables: {
              email: user.email,
              username: user.name,
              location: "Indonesia",
              thumbnail: user.photoUrl
            }
          }).subscribe(result => { 
            this.message = result.data["createUser"]["id"]
            this.restrictMode = result.data["createUser"]["restriction"]
            this.loca = result.data["createUser"]["location"]
            localStorage.setItem("userID", result.data["createUser"]["id"])
            localStorage.setItem("restriction", result.data["createUser"]["restriction"])
            localStorage.setItem("location", result.data["createUser"]["location"])
            localStorage.setItem("premium", result.data["createUser"]["premium"])
            this.userID = localStorage.getItem('userID')
            this.getListPlaylist()
            this.data.changeMessage(this.message)
          })
    })
  }

  getListPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: getPlaylist, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => { 
      this.playlist = result.data.playlists
      this.getplaylistSub()
      this.getSubscribe()
     })
  }

  channelSubs: any
  channels: any=[]
  totalChannel: number

  getSubscribe(): void {
    this.apollo.watchQuery<any>({
      query: getChannelSubscribe, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
      this.channelSubs = result.data.getChannelSubscribe
      for(let i : number = 0 ; i < this.channelSubs.length; i++){
        this.apollo.watchQuery<any>({
          query: getUser, variables: {
            userID: this.channelSubs[i].channelUserID
          }
        }).valueChanges.subscribe(result => {
          this.channels.push(result.data.userById)
          this.channels = this.channels.slice().sort((a, b) => (a.username > b.username) ? -1 : 1)
          this.totalChannel = this.channels.length
        })
      }   
    })
  }

  getplaylistSub(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylistSub, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe( result => {
      let playlists = result.data.retrieveAllPlaylistSubs
      for(let i : number = 0 ; i < playlists.length ; i++){
        this.apollo.watchQuery<any>({
          query: retrievePlaylistFromSub, variables: {
            playlistID: playlists[i].playlistID
          }
        }).valueChanges.subscribe(result => {
          this.playlists.push(result.data.playlist)
        })
      }
    })
  }

  updateLocation(loc: string): void{
    this.apollo.mutate({
      mutation: updateLocation, variables: {
        id: localStorage.getItem("userID"),
        location: loc
      }
    }).subscribe(result => {
      alert("location updated")
      localStorage.setItem("location", loc)
    })
  }

  updateRestricted(): void{
    var element = document.getElementById("modeRestrict")
    var bool = (element as HTMLInputElement).checked
    this.apollo.mutate({
      mutation: updateRestriction, variables: {
        id: localStorage.getItem("userID"),
        restriction: bool
      }
    }).subscribe(result => {
      alert("restriction updated !!")
      localStorage.setItem("restriction", JSON.stringify(bool))
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    localStorage.clear()
    this.authService.signOut()
    window.location.reload()
  }

  changeRoute(str: string): void {
    this.route.navigate(['main/category', str])
  }

//---------------------------------------------------------------------------

  hide(): void{
    var element = document.getElementById('sidebar-hide');
    var element2 = document.getElementById('content-list');
    (element.style.display == 'block') ? element.style.display = 'none' : element.style.display = 'block';
    (element.style.display == 'block') ? element2.style.zIndex = '-1' : element2.style.zIndex = '0';
  }

  HideSetting(): void{
    var element = document.getElementById('setting');
    var element2 = document.getElementById('content-list');
    (element.style.display == 'block') ? element.style.display = 'none' : element.style.display = 'block';
    (element.style.display == 'block') ? element2.style.zIndex = '-1' : element2.style.zIndex = '0';
  }

  HideLocation(): void{
    var element = document.getElementById('setting-container-main');
    var element2 = document.getElementById('setting-container-location');
    if(element.style.display == 'block'){
      element.style.display = 'none';
      element2.style.display  = 'block';
    }else{
      element.style.display = 'block';
      element2.style.display ='none';
    }
  }

  HideShortcut(): void{
    var element = document.getElementById('shortcut');
    var element2 = document.getElementById('setting-container-main');
    if(element.style.display == 'block'){
      element.style.display = 'none';
      element2.style.display = 'block';
    }else{
      element.style.display = 'block';
      element2.style.display = 'none';
    }
  }

  HideRestricted(): void{
    var element = document.getElementById('setting-container-main');
    var element2 = document.getElementById('setting-container-restricted');
    if(element.style.display == 'block'){
      element.style.display = 'none';
      element2.style.display = 'block';
    }else{
      element.style.display = 'block';
      element2.style.display = 'none';
    }
  }

  HideSignOut(): void{
    var element = document.getElementById("user-sign-out");
    if(element.style.display == 'block'){
      element.style.display = 'none'
    }else{
      element.style.display = 'block'
    }
  }

  showCreatePlaylist(): void {
    if(this.boolCreatePlaylist){
      this.boolCreatePlaylist = false
    }else{
      this.boolCreatePlaylist = true
    }
  }

  createPlayList(): void{
    let title = (document.getElementById('playlist-header') as HTMLInputElement).value
    let description = (document.getElementById('playlist-desc') as HTMLTextAreaElement).value
    let accessElement = (document.getElementById('playlist-access') as HTMLSelectElement).selectedIndex
    let access = (document.getElementById('playlist-access') as HTMLSelectElement).options[accessElement].value
    let acc : boolean
    if(access == "Public"){
      acc = true
    }else{
      acc = false
    }
    if(title != "" && description != "" && this.userID != null){
      this.apollo.mutate({
        mutation: mutatePlaylist, variables: {
          userID: this.userID,
          type: acc,
          description: description,
          title: title
        }
      }).subscribe(result => { 
        alert("create Playlist Success !")
        window.location.reload()
      })
    }
  }

  moveToPlaylist(id: any): void {
    this.route.navigate(['/main/playlist', id])
  }

  toKeyword(): void {
    let keyword = (document.getElementById('search-keyword') as HTMLInputElement).value
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigate(['/main/search/keyword', keyword])
    })
  }

  toKeywordByString(str: string): void {
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigate(['/main/search/keyword', str])
    })
  }

  keyword: string
  
  searchColor$ = new BehaviorSubject<string>("");
  
  suggestion$: Observable<any> = this.searchColor$.pipe(
    debounceTime(250),
    switchMap(searchResultText => {
      return this.apollo.watchQuery<any>({
        query: getSuggestion, variables: {
          keyword: searchResultText
        }
      }).valueChanges.pipe(map(({data}) => data.getVideoByKeywordTopFive))
    }), map((suggestion: any) => suggestion.map( result => result.title)),
    )
    
  suggestions: Observable<any> = this.suggestion$

  keywordx: string

  doColorSearch(keyword: string) {
    this.keywordx = keyword
    this.searchColor$.next(keyword)
  }

  navigation(channelID: string): void {
    this.route.navigate(['/main/channel', channelID, 'home'])
    window.location.href="/main/channel/" + channelID + '/home'
  }

  showMore(): void {
    this.lastKey = this.channels.length
  }

  showUser: boolean = false

  ShowUserChoice(): void {
    if(this.showUser){
      this.showUser = false
    }else{
      this.showUser = true
    }
  }

  switchAccount(): void {
    localStorage.clear()
    this.authService.signOut()
    this.signInWithGoogle()
  }

  

}
