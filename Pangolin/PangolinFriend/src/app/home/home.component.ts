import { Component, OnInit } from '@angular/core';
import { PangolinsService } from '../pangolins/pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { Pangolin } from '../pangolins/pangolins.model';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  submitted = false;
  friends: Pangolin[] = [];
  showForm = false;
  errorMessage = '';

  constructor(
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.pangolinsService.getAll().subscribe((res) => {
      this.pangolinsService.pangolin = res as Pangolin[];
    });
  }

  addFriend(pangolin) {
    this.pangolinsService.addFriend(pangolin).subscribe((res) => {
      localStorage.removeItem('currentPangolin');
      localStorage.setItem('currentPangolin', JSON.stringify(res));
      window.location.reload();
    });
  }

  addNewFriend(form: NgForm) {
    this.pangolinsService.register(form.value).pipe(first())
    .subscribe(
      res => { this.addFriend(res); this.showForm = false; form.reset(); },
      error => { this.loading = false; this.errorMessage = error.error; });
  }

  removeFriend(pangolin: Pangolin) {
    this.pangolinsService.removeFriend(pangolin).subscribe((res) => {
      localStorage.removeItem('currentPangolin');
      localStorage.setItem('currentPangolin', JSON.stringify(res));
      window.location.reload();
    });
  }

  showNewFriendForm() {
    this.showForm = true;
  }

  isFriend(id: string) {
    return this.authenticationService.currentPangolinValue.friends.includes(id);
  }
}


