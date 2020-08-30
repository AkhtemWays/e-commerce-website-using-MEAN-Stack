import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isAuthorized: boolean = false;
  currentUser: any;
  loggingData: any;
  constructor(private http: HttpClient, private router: Router) {}
  callApi(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((data) => data),
      catchError((err) => this.handleError(err))
    );
  }
  handleError(err: HttpErrorResponse) {
    return throwError(err.message);
  }
  getHeaders(noheaders: boolean) {
    if (noheaders) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          NoAuth: 'True',
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        }),
      };
    }
  }
  callPostApi(url: string, body, noheaders: boolean) {
    return this.http
      .post((url = url), (body = body), this.getHeaders(noheaders))
      .pipe(catchError((err) => this.handleError(err)));
  }
  saveToken(token: string) {
    localStorage.setItem('auth', JSON.stringify(token));
  }
  deleteToken() {
    localStorage.removeItem('auth');
  }
  getToken() {
    return JSON.parse(localStorage.getItem('auth'));
  }
  logout() {
    this.deleteToken();
    this.isAuthorized = false;
  }
  getProduct(id): Observable<any> {
    return this.http.post(
      'http://localhost:5000/api/product',
      { id: id },
      this.getHeaders(true)
    );
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      this.http
        .get(
          'http://localhost:5000/api/user/authenticate',
          this.getHeaders(false)
        )
        .subscribe(
          (data) => {
            this.loggingData = data;
            if (this.loggingData.token && this.loggingData.currentUser) {
              this.saveToken(this.loggingData.token);
              this.isAuthorized = true;
              this.currentUser = this.loggingData.currentUser;
            }
          },
          (err) => {
            console.log(err);
            this.deleteToken();
            this.isAuthorized = false;
          }
        );
    } else {
      this.deleteToken();
      this.isAuthorized = false;
    }
  }
}
