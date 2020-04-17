import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pangolin } from '../pangolins/pangolins.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentPangolinSubject: BehaviorSubject<Pangolin>;
    public currentPangolin: Observable<Pangolin>;
    readonly baseURL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {
        this.currentPangolinSubject = new BehaviorSubject<Pangolin>(JSON.parse(localStorage.getItem('currentPangolin')));
        this.currentPangolin = this.currentPangolinSubject.asObservable();
    }

    public get currentPangolinValue(): Pangolin {
        return this.currentPangolinSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.baseURL + `/auth`, { username, password })
            .pipe(map(pangolin => {
                // login successful if there's a jwt token in the response
                console.log(pangolin);
                if (pangolin) {
                    // store pangolin details and jwt token in local storage to keep pangolin logged in between page refreshes
                    localStorage.setItem('currentPangolin', JSON.stringify(pangolin));
                    this.currentPangolinSubject.next(pangolin);
                }
                return pangolin;
            }));
    }

    logout() {
        // remove Pangolin from local storage to log Pangolin out
        localStorage.removeItem('currentPangolin');
        this.currentPangolinSubject.next(null);
    }
}
