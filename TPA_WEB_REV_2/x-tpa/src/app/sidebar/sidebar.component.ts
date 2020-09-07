import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  user: any
  userID: any

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userID = localStorage.getItem('userID')
  }
  
  myChannel(): void {
    this.router.navigate(['/main/channel', this.userID,'home'])
  }

  goTo(str: string): void {
    this.router.navigate(['/main', str])
  }

}
