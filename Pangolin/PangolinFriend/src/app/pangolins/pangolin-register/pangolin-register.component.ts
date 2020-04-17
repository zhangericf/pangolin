import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PangolinsService } from '../pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { first } from 'rxjs/operators';
import { Pangolin } from '../pangolins.model';

@Component({
  selector: 'app-pangolin-register',
  templateUrl: './pangolin-register.component.html',
  styleUrls: ['./pangolin-register.component.css']
})
export class PangolinRegisterComponent implements OnInit {
  loading = false;
  submitted = false;

  constructor(private router: Router,
              public pangolinsService: PangolinsService,
              public authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentPangolinValue) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
    this.resetForm();
    this.refreshList();
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
    };
  }

  refreshList() {
    this.pangolinsService.getAll().subscribe((res) => {
      this.pangolinsService.pangolin = res as Pangolin[];
    });
  }

  onEdit(pangolin: Pangolin) {
    this.pangolinsService.selectedPangolin = pangolin;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    this.loading = true;
    this.pangolinsService.register(form.value)
    .pipe(first())
    .subscribe((res) => { this.resetForm(form); this.refreshList(); },
    data => { this.router.navigate(['/login']); });
  }

  onUpdate(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    this.loading = true;
    this.pangolinsService.update(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshList();
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.pangolinsService.delete(id).subscribe((res) => {
        this.refreshList();
      });
    }
  }
}


