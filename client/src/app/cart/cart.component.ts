import { Product } from './../models/product.model';
import { Router } from '@angular/router';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  service: CommonService;
  idToQuantity = {};
  subTotal: number = 0;
  totalShipping: number = 0;
  data: any;
  constructor(service: CommonService, private router: Router) {
    this.service = service;
    this.makeCalculations();
  }
  makeCalculations() {
    this.subTotal = 0;
    this.idToQuantity = {};
    this.service.currentUser.cart.forEach((product) => {
      this.subTotal += this.getPriceWithDiscount(
        product.price,
        product.discount
      );
      if (product._id in this.idToQuantity) {
        this.idToQuantity[product._id] += 1;
      } else {
        this.idToQuantity[product._id] = 1;
      }
    });
  }
  getTotalShipping() {
    for (let id of Object.keys(this.idToQuantity)) {
      const product = this.service.currentUser.cart.find(
        (product) => product._id === id
      );
      this.totalShipping += product.shipping_fee * this.idToQuantity[id];
    }
    return this.totalShipping;
  }
  remove(product: Product) {
    this.service
      .callPostApi(
        'http://localhost:5000/api/user/remove-cart-product',
        {
          product: product,
          username: this.service.currentUser.username,
        },
        false
      )
      .subscribe((data) => {
        this.data = data;
        this.service.currentUser = this.data.currentUser;
        console.log(this.service.currentUser);
        this.makeCalculations();
      });
  }
  getPriceWithDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }
  goToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  ngOnInit(): void {
    this.service.isLoggedIn();
    if (!this.service.getToken()) {
      this.router.navigateByUrl('/home');
    }

    this.getTotalShipping();
  }
}
