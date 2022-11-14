import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]= [];


  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  notAdmin(){
    if(localStorage.getItem("role")=='Admin')
      return false;
    return true;

  }

  deleteUser(id : number, name : string){
    if(confirm("Do you want to delete " + name + "?")){
      this.userService.deleteUser(id)
    .subscribe({
      next:(response) => {
        console.log(response);
        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() =>
        {
          this.router.navigate(['/users']);
        });

        setTimeout(function() {alert(name + ' deleted successfully!');},100);
      }
    });
    }
    else{
      alert("Delete Cancelled!");
    }

  }

}
