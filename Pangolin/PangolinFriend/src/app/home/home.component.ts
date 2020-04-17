import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PangolinsService } from '../pangolins/pangolins.service';
import { AuthenticationService } from 'src/app/_services/authentification.service';
import { first } from 'rxjs/operators';
import { Pangolin } from '../pangolins/pangolins.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  submitted = false;

  constructor(
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService
  ) {  }

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


