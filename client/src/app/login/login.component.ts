import { Router } from '@angular/router';
import { CommonService } from './../common.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  response: any;
  constructor(private service: CommonService, private router: Router) {}
  onSubmit(form: NgForm) {
    this.service
      .callPostApi('http://localhost:5000/api/auth/login', form.value, true)
      .subscribe(
        (data) => {
          this.response = data;
          this.service.saveToken(this.response.token);
          this.service.currentUser = this.response.currentUser;
          this.service.isAuthorized = true;
          this.router.navigateByUrl('/home');
        },
        (err) => {
          console.log(err);
          this.service.isAuthorized = false;
          this.service.currentUser = null;
        }
      );
  }
  ngOnInit(): void {
    this.service.isLoggedIn();
    if (this.service.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }
}
