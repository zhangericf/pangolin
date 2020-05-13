import { Component, OnInit, OnDestroy } from '@angular/core';
import { PangolinsService } from '../_services/pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { Pangolin } from '../pangolins/pangolins.model';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocketService } from '../_services/socket.service';


function getSearchBar() {
  return document.getElementById('searchBar') as HTMLInputElement;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = false;
  submitted = false;
  friends: Pangolin[] = [];
  showForm = false;
  showChat = false;
  errorMessage = '';
  searchBar: HTMLInputElement;
  search = '';
  users: string[] = [];

  constructor(
    private router: Router,
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService,
    public socketService: SocketService,
  ) {
  }

  ngOnInit() {
    this.refreshList();
    this.socketService.setupSocketConnection();

    this.searchBar = getSearchBar();
    this.searchBar.addEventListener('keyup', () => {
      this.search = this.searchBar.value;
    });
  }

  searchFriend(pangolin: Pangolin) {
    const mySearch = pangolin.username.startsWith(this.search);
    return mySearch;
  }

  refreshList() {
    this.pangolinsService.getAll().subscribe((res) => {
      this.pangolinsService.pangolin = res as Pangolin[];
    });
  }

  addFriend(pangolin: any) {
    this.pangolinsService.addFriend(pangolin).subscribe((res) => {
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
      localStorage.setItem('currentPangolin', JSON.stringify(res));
      window.location.reload();
    });
  }

  showNewFriendForm() {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  isFriend(id: string) {
    return this.authenticationService.currentPangolinValue.friends.includes(id);
  }

  showChatContainer() {
    if (this.showChat) {
      this.showChat = false;
    } else {
      this.showChat = true;
    }
  }

  friendProfile(pangolin: Pangolin) {
    this.pangolinsService.selectedPangolin = pangolin;
    this.router.navigate(['/profile']);
  }

  isConnected(username: string) {
    return this.users.includes(username);
  }

}


