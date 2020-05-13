import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pangolin } from '../pangolins/pangolins.model';
import { AuthenticationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class PangolinsService {
  pangolin: Pangolin[] = [];
  selectedPangolin: Pangolin;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }
  readonly baseURL = 'http://localhost:3000/api';

  getAll() {
      return this.http.get(this.baseURL + ``);
  }

  getById(id: string) {
      return this.http.get(this.baseURL + `/` + id);
  }

  addFriend(pangolin: Pangolin) {
    return this.http.put(this.baseURL + `/addFriend/` + `${pangolin._id}`, this.authenticationService.currentPangolinValue);
  }

  removeFriend(pangolin: Pangolin) {
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
