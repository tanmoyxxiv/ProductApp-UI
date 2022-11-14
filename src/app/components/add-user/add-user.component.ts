import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserRequest: User = {
    id : 0,
    username: '',
    name: '',
    password: '',
    address: '',
    city: '',
    role: ''

  }

  confirmPass : string = 'none';
  constructor(private userService : UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  addForm = new FormGroup({
    name: new FormControl("",[ Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]+")]),
    password: new FormControl("",[ Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl("",[ Validators.required]),
    address: new FormControl("",[ Validators.required, Validators.minLength(3)]),
    city: new FormControl("",[ Validators.required, Validators.minLength(3)]),
    role: new FormControl("",[ Validators.required]),
  });

  addSubmit(){
    if(this.Password.value == this.Cpassword.value){
      console.log(this.addForm.valid);
      console.log(this.addForm.value);
      this.confirmPass='none';
      this.addUserRequest.name = this.addForm.value.name as string;
      this.addUserRequest.password = this.addForm.value.password as string;
      this.addUserRequest.city = this.addForm.value.city as string;
      this.addUserRequest.address = this.addForm.value.address as string;
      this.addUserRequest.role = this.addForm.value.role as string;
      this.addUser();
    }
    else{
      this.confirmPass='inline';
    }
  }

  get Name(): FormControl{
    return this.addForm.get("name") as FormControl;
  }
  get Password(): FormControl{
    return this.addForm.get("password") as FormControl;
  }
  get Cpassword(): FormControl{
    return this.addForm.get("cpassword") as FormControl;
  }
  get Address(): FormControl{
    return this.addForm.get("address") as FormControl;
  }
  get City(): FormControl{
    return this.addForm.get("city") as FormControl;
  }
  get Role(): FormControl{
    return this.addForm.get("role") as FormControl;
  }

  addUser(){
    this.userService.addUser(this.addUserRequest)
    .subscribe({
      next: (user) => {
        this.router.navigate(['/users']);
        setTimeout(function() {alert(user.name + ' added successfully!');},100);
      }
    });
  }
  cancelAdd(){
    this.router.navigate(['/users']);
  }

}
