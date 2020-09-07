import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-video-genre',
  templateUrl: './video-genre.component.html',
  styleUrls: ['./video-genre.component.sass']
})
export class VideoGenreComponent implements OnInit {
 
  @Input('video') video: any

  @Output() showModal = new EventEmitter<boolean>()
  @Output() videoID = new EventEmitter<any>()

  showSetting: boolean
  
  constructor(private router: Router) { }

  views: any

  ngOnInit(): void {
    this.showSetting = false
    this.views = this.getformat(this.video.views)
  }

  hide(): void{
    if(this.showSetting == false){
      this.showSetting = true
    }
    else{
      this.showSetting = false
    }  
  }

  showModalFunc(): void {
    this.showModal.emit(true)
    this.videoID.emit(this.video.videoID)
  }

  onSelect(): void{
    this.router.navigate(['/main/videoPlayer', this.video.videoID])
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
