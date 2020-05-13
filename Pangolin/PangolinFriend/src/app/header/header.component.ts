import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { Router } from '@angular/router';
import { PangolinsService } from '../_services/pangolins.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private pangolinService: PangolinsService) {
  }

  ngOnInit() {
  }

  navProfile() {
    this.pangolinService.selectedPangolin = this.authenticationService.currentPangolinValue;
    this.router.navigate(['/profile']);
  }

}
