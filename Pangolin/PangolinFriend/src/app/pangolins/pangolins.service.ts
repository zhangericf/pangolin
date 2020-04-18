import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pangolin } from './pangolins.model';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class PangolinsService {
  selectedPangolin: Pangolin;
  pangolin: Pangolin[] = [];
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  readonly baseURL = 'http://localhost:3000/api';

  getAll() {
      return this.http.get(this.baseURL + ``);
  }

  getById(id: string) {
      return this.http.get(this.baseURL + `/` + id);
  }

  addFriend(pangolin: Pangolin) {
    console.log('"caca"' + `${this.authenticationService.currentPangolinValue._id}`);
    console.log('tete' + pangolin._id);
    return this.http.put(this.baseURL + `/addFriend/` + `${pangolin._id}`, this.authenticationService.currentPangolinValue);
  }

  removeFriend(pangolin: Pangolin) {
    console.log('"caca"' + `${this.authenticationService.currentPangolinValue._id}`);
    console.log('tete' + pangolin._id);
    return this.http.put(this.baseURL + `/removeFriend/` + `${pangolin._id}`, this.authenticationService.currentPangolinValue);
  }

  register(pangolin: Pangolin) {
      return this.http.post(this.baseURL + `/register`, pangolin);
  }

  update(pangolin: Pangolin) {
    return this.http.put(this.baseURL + `/` + `${pangolin._id}`, pangolin);
  }

  delete(id: string) {
      return this.http.delete(this.baseURL + `/` + id);
  }
}
