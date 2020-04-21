import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PangolinsService } from '../pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pangolin-register',
  templateUrl: './pangolin-register.component.html',
  styleUrls: ['./pangolin-register.component.css']
})
export class PangolinRegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(private router: Router,
              public pangolinsService: PangolinsService,
              public authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.pangolinsService.selectedPangolin = {
      _id: '',
      username: '',
      password: '',
      age: null,
      famille: '',
      race: '',
      nourriture: '',
      friends: null
    };
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    this.loading = true;
    this.pangolinsService.register(form.value).pipe(first())
    .subscribe(
      res => { this.resetForm(form); this.router.navigate(['/login']); },
      error => { this.loading = false; this.errorMessage = error.error; });
  }
}


