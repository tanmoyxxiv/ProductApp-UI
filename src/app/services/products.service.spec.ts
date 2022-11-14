import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';


describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let baseApiUrl : string = environment.baseApiUrl;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('ProductsService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllProducts() should return a list of product result', () => {
    const result: Product[] = [
      {
        id: 1,
        name: 'TV',
        quantity: 2,
        price: 4999,
        status: 'Approved'
      },
      {
        id: 2,
        name: 'Table',
        quantity: 2,
        price: 4999,
        status: 'Rejected'
      },
      {
        id: 3,
        name: 'Sofa',
        quantity: 4,
        price: 4999,
        status: 'Pending'
      }
    ];

    service.getAllProducts().subscribe(result=> {
      expect(result).toBeTruthy();
      expect(result.length).toEqual(3);
      console.log('Products Service Test - getAllProducts() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Products');
     expect(req.request.method).toBe('GET');
     req.flush(result);
  });

  it('addProduct() should return a added product result', () => {
    const result: Product = {
        id: 1,
        name: 'TV',
        quantity: 2,
        price: 4999,
        status: 'Approved'
      };

    service.addProduct(result).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Products Service Test - addProduct() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Products');
     expect(req.request.method).toBe('POST');
     req.flush(result);
  });

  it('getProduct() should return a product result', () => {
    const result: Product = {
        id: 1,
        name: 'TV',
        quantity: 2,
        price: 4999,
        status: 'Approved'
      };

    const id = 1;


    service.getProduct(id).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Products Service Test - getProduct() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Products/'+id);
     expect(req.request.method).toBe('GET');
     req.flush(result);
  });

  it('updateProduct() should return a updated product result', () => {
    const result: Product = {
        id: 1,
        name: 'TV',
        quantity: 2,
        price: 4999,
        status: 'Approved'
      };
    const id = 1;

    service.updateProduct(id,result).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Products Service Test - updateProduct() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Products/'+id);
     expect(req.request.method).toBe('PUT');
     req.flush(result);
  });

  it('deleteProduct() should return a deleted product result', () => {
    const result: Product = {
        id: 1,
        name: 'TV',
        quantity: 2,
        price: 4999,
        status: 'Approved'
      };
    const id = 1;

    service.deleteProduct(id).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Products Service Test - deleteProduct() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Products/'+id);
     expect(req.request.method).toBe('DELETE');
     req.flush(result);
  });
});
