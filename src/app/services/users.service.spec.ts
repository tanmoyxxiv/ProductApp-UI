import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';


describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let baseApiUrl : string = environment.baseApiUrl;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('UsersService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllUsers() should return a list of user result', () => {
    const result: User[] = [
      {
        name: 'Tanmoy',
        id: 1,
        username: 'U001',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Admin'
      },
      {
        name: 'Jim',
        id: 2,
        username: 'U002',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Manager'
      },
      {
        name: 'Mark',
        id: 3,
        username: 'U003',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'User'
      }
    ];

    service.getAllUsers().subscribe(result=> {
      expect(result).toBeTruthy();
      expect(result.length).toEqual(3);
      console.log('Users Service Test - getAllUsers() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Users');
     expect(req.request.method).toBe('GET');
     req.flush(result);
  });

  it('addUser() should return a added user result', () => {
    const result: User = {
        name: 'Tanmoy',
        id: 1,
        username: 'U001',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Admin'
      };

    service.addUser(result).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Users Service Test - addUser() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Users');
     expect(req.request.method).toBe('POST');
     req.flush(result);
  });

  it('getUser() should return a user result', () => {
    const result: User = {
        name: 'Tanmoy',
        id: 1,
        username: 'U001',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Admin'
      };

    const id = 1;


    service.getUser(id).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Users Service Test - getUser() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Users/'+id);
     expect(req.request.method).toBe('GET');
     req.flush(result);
  });

  it('updateUser() should return a updated user result', () => {
    const result: User = {
        name: 'Tanmoy',
        id: 1,
        username: 'U001',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Admin'
      };
    const id = 1;

    service.updateUser(id,result).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Users Service Test - updateUser() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Users/'+id);
     expect(req.request.method).toBe('PUT');
     req.flush(result);
  });

  it('deleteUser() should return a deleted user result', () => {
    const result: User = {
        name: 'Tanmoy',
        id: 1,
        username: 'U001',
        password: '1234',
        address: 'West Bengal',
        city: 'Barakar',
        role: 'Admin'
      };
    const id = 1;

    service.deleteUser(id).subscribe(result=> {
      expect(result).toBeTruthy();
      console.log('Users Service Test - deleteUser() Verified');
    });

     const req = httpMock.expectOne(baseApiUrl + '/api/Users/'+id);
     expect(req.request.method).toBe('DELETE');
     req.flush(result);
  });
});
