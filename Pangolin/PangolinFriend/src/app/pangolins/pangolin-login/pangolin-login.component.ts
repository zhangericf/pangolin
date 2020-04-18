import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PangolinsService } from '../pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { Pangolin } from '../pangolins.model';

@Component({
  selector: 'app-pangolin-login',
  templateUrl: './pangolin-login.component.html',
  styleUrls: ['./pangolin-login.component.css']
})
export class PangolinLoginComponent implements OnInit {
  loading = false;
  modify = false;
  submitted = false;
  pangolin: Pangolin;
  errorMessage = '';

  constructor(
    private router: Router,
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentPangolinValue) {
        this.router.navigate(['/profile']);
        this.pangolin = authenticationService.currentPangolinValue;
      } else {
        this.router.navigate(['/login']);
      }
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
      this.submitted = true;

      // stop here if form is invalid
      if (form.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(form.value.username, form.value.password)
          .pipe(first())
          .subscribe(data => { this.router.navigate(['/home']); },
          error => { this.loading = false; this.errorMessage = error.error});
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
      localStorage.removeItem('currentPangolin');
      localStorage.setItem('currentPangolin', JSON.stringify(res));
      this.modify = false;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
