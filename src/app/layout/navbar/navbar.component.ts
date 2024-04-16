import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isOpen?:boolean
  isUser=true
  constructor(private as: AuthService, private router: Router) {
  }
  isToggle() {
    this.isOpen = !this.isOpen
  }
  ngOnInit(): void {
    this.as.user.subscribe((user: any) => {
      if (user) {
        this.isUser = true
        this.as.userId = user.uid
      }
      else {
        this.isUser = false
        this.as.userId = ''
      }
    })
  }

  logOut() {
    this.as.logout().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
