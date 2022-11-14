import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Status } from 'src/app/models/status.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[]= [];
  status: Status = {status:''};

  constructor(private productService: ProductsService,private router : Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      }
    });

  }

  changeStatus(id : number, value : any){
    this.status.status = value.target.value;
    console.log(this.status);
    this.productService.changeStatus(id,this.status)
    .subscribe({
      next:(response) => {
        console.log(response);
        this.router.navigate(['/products']);
      }
    });
  }

  isRole(role:string){
    if(localStorage.getItem("role") == role)
      return true;
    return false;

  }


  deleteProduct(id : number, name : string){
    if(confirm("Do you want to delete " + name + "?")){
      this.productService.deleteProduct(id)
    .subscribe({
      next:(response) => {

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() =>
        {
          this.router.navigate(['/products']);
        });

        setTimeout(function() {alert(name + ' deleted successfully!');},100);
      }
    });
    }
    else{
      alert("Delete Cancelled!");
    }

  }

  calculateStyle(status : string){
    if(status == 'Pending')
      return '#f4dc7f';
    else if(status == 'Rejected')
      return '#f4837f';
    else
    return '#5affbf';
  }

}
