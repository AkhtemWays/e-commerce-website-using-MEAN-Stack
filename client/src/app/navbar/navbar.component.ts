import { Router } from '@angular/router';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  service: CommonService;
  constructor(service: CommonService, private router: Router) {
    this.service = service;
  }
  redirectToCart() {
    this.router.navigateByUrl('/cart');
  }

  ngOnInit(): void {}
}
