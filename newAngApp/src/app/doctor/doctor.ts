import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  imports: [],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor implements OnInit {
  constructor(private authSer: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (!this.authSer.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

}