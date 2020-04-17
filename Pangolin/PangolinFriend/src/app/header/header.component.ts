import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
