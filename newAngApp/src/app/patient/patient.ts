import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient implements OnInit {
  constructor(private authSer: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (!this.authSer.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

}