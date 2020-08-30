import { CurrentUser } from './../models/user.model';
import { Product } from './../models/product.model';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product;
  id: string;
  isAuthorized: boolean = this.service.isAuthorized;
  data;
  constructor(private _route: ActivatedRoute, private service: CommonService) {}

  getPriceWithDiscount(price: number, discount: number) {
    return price - price * (discount / 100);
  }
  ngOnInit(): void {
    this.service.isLoggedIn();
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.service
      .getProduct(this.id)
      .subscribe((data) => (this.product = data.product));
  }
  getImageLocation(brandName) {
    return `../../assets/${brandName}`;
  }
  addToCart(product: Product) {
    this.service
      .callPostApi(
        'http://localhost:5000/api/user/addtocart',
        {
          product: product,
          username: this.service.currentUser.username,
        },
        false
      )
      .subscribe(
        (data) => {
          this.data = data;
          this.service.currentUser = this.data.currentUser;
        },
        (err) => console.log(err)
      );
  }
}
