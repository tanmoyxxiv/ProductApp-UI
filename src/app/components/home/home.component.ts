import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[]= [];

  constructor(private productService: ProductsService,private router : Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.products = products;

        for(var i = this.products.length-1; i >=0 ; --i) {
            if (this.products[i].status!='Approved') {
              this.products.splice(i, 1); // Remove
            }
          }

        console.log(this.products);
      },
      error: (response) => {
        console.log(response);
      }
    });

  }

}
