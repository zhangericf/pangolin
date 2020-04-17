import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pangolin } from './pangolins.model';


@Injectable({
  providedIn: 'root'
})
export class PangolinsService {
  selectedPangolin: Pangolin;
  pangolin: Pangolin[] = [];
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/api';

  getAll() {
      return this.http.get(this.baseURL + ``);
  }

  getById(id: string) {
      return this.http.get(this.baseURL + `/` + id);
  }

  register(pangolin: Pangolin) {
      return this.http.post(this.baseURL + `/register`, pangolin);
  }

  update(pangolin: Pangolin) {
    console.log(pangolin._id);
    return this.http.put(this.baseURL + `/` + `${pangolin._id}`, pangolin);
  }

  delete(id: string) {
      return this.http.delete(this.baseURL + `/` + id);
  }
}
