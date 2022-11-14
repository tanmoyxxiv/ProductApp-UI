import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productDetails: Product ={
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    status: ''
  }

  constructor(private route: ActivatedRoute, private productService: ProductsService,
     private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          //call api
          this.productService.getProduct(+id)
          .subscribe({
            next: (response) => {
              this.productDetails = response;
            }
          });
        }
      }
    })
  }

  updateProduct(){
    this.productService.updateProduct(this.productDetails.id,this.productDetails)
    .subscribe({
      next:(response) => {
        this.router.navigate(['/products']);
        const name = this.productDetails.name;
        setTimeout(function() {alert(name  + ' updated successfully!');},100);
      }
    });

  }

  cancelUpdate(){
    this.router.navigate(['/products']);
    setTimeout(function() {alert('Update Cancelled!');},100);

  }

}
