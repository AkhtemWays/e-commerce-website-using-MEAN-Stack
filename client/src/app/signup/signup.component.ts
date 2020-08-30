import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { SignupUser } from '../models/signupUser.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: SignupUser = {
    address: {
      country: '',
      city: '',
      street: '',
      house: '',
      zipcode: '',
      flat: '',
    },
    username: '',
    password: '',
  };
  message: any;
  constructor(private service: CommonService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.errors) {
      this.service
        .callPostApi('http://localhost:5000/api/auth/signup', form.value, true)
        .subscribe((data) => {
          this.message = data;
          this.router.navigateByUrl('/login');
          form.reset();
        });
    }
  }

  ngOnInit(): void {
    this.service.isLoggedIn();
    if (this.service.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }
}
