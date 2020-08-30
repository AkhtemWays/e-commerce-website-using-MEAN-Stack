import { Router } from '@angular/router';
import { Product } from './../models/product.model';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  full: boolean = false;
  bestsellerProducts: Product[] = [];
  constructor(
    private service: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  getBrandLocation(brand: string) {
    const location = '../../assets/' + brand;
    return location;
  }
  ngOnInit(): void {
    this.service.isLoggedIn();
    this.spinner.show();
    this.loading = true;

    this.service.callApi('http://localhost:5000/api/home').subscribe((data) => {
      for (let i = 0; i < data.products.length; i += 2) {
        data.products[i + 1] &&
          data.products[i + 2] &&
          this.bestsellerProducts.push(data.products.slice(i, i + 2));
      }
      this.loading = false;
      this.spinner.hide();
    });
  }
  redirect(id) {
    this.router.navigate([this.router.url, 'product', `${id}`]);
  }
}
