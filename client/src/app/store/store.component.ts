import { Router } from '@angular/router';
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  categoriesBatched: string[] = [];
  constructor(private service: CommonService, private router: Router) {}
  getCategoryImageLocation(category: string) {
    return `../../assets/${category}.jpg`;
  }
  redirectByCategory(category: string) {
    this.router.navigate(['products', category]);
  }
  ngOnInit(): void {
    this.service.isLoggedIn();
    this.service
      .callApi('http://localhost:5000/api/store')
      .subscribe((data) => {
        for (let i = 0; i < data.categories.length; i += 2) {
          data.categories[i] &&
            data.categories[i + 1] &&
            this.categoriesBatched.push(data.categories.slice(i, i + 2));
        }
      });
  }
}
