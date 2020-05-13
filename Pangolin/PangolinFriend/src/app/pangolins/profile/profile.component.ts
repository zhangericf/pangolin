import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PangolinsService } from '../../_services/pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { Pangolin } from '../pangolins.model';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading = false;
  modify = false;
  submitted = false;
  pangolin: Pangolin;
  errorMessage = '';
  showChat1 = false;

  constructor(
    private router: Router,
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService,
    private socketService: SocketService
  ) {
      // redirect to home if already logged in
      if (!this.authenticationService.currentPangolinValue) {
        this.router.navigate(['/login']);
      }

      if (pangolinsService.selectedPangolin.username === authenticationService.currentPangolinValue.username) {
        this.showChat1 = true;
      }
  }

  ngOnInit() {
    this.pangolin = this.pangolinsService.selectedPangolin;
  }

  onEdit() {
    this.modify = true;
  }

  stopModify() {
    this.modify = false;
  }

  onUpdate(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    this.loading = true;
    this.pangolinsService.update(form.value).subscribe((res) => {
      localStorage.setItem('currentPangolin', JSON.stringify(res));
      this.modify = false;
    });
  }

  showChatContainer1() {
    if (this.showChat1) {
      this.showChat1 = false;
    } else {
      this.showChat1 = true;
    }
  }

  logout() {
    this.socketService.disconnectUser(this.authenticationService.currentPangolinValue._id);
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
