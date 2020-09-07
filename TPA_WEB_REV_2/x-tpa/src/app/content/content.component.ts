import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from '../route-animations'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
  animations: [
    fader
  ]
})

export class ContentComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
