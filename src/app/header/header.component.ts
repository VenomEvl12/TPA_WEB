import { Component, OnInit } from '@angular/core';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


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
}
