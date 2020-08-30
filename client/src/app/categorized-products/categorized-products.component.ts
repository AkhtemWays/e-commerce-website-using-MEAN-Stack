import { Product } from './../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categorized-products',
  templateUrl: './categorized-products.component.html',
  styleUrls: ['./categorized-products.component.css'],
})
export class CategorizedProductsComponent implements OnInit {
  currentCategory: string;
  products: Product[];
  loading: boolean = false;
  constructor(
    private service: CommonService,
    private _route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.service.isLoggedIn();
    this.loading = true;
    this.spinner.show();
    this._route.paramMap.subscribe((params) => {
      this.currentCategory = params.get('category');
    });
    this.service
      .callApi(`http://localhost:5000/api/store/${this.currentCategory}`)
      .subscribe(
        (data) => {
          this.products = data.products;
          this.spinner.hide();
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.loading = false;
        }
      );
  }
  redirect(id: string) {
    this.router.navigate(['products', 'product', id]);
  }
  getBrandLocation(brand: string) {
    console.log(brand);
    return '../../assets/' + brand;
  }
}
