import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  updateUserRequest: User = {
    id : 0,
    username: '',
    name: '',
    password: '',
    address: '',
    city: '',
    role: ''

  }

  confirmPass : string = 'none';
  constructor(private route: ActivatedRoute,private userService : UsersService, private router:Router) { }

  updateForm = new FormGroup({
    name: new FormControl("",[ Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]+")]),
    password: new FormControl("",[ Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl("",[ Validators.required]),
    address: new FormControl("",[ Validators.required, Validators.minLength(3)]),
    city: new FormControl("",[ Validators.required, Validators.minLength(3)]),
    role: new FormControl("",[ Validators.required]),
  });
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          //call api
          this.userService.getUser(+id)
          .subscribe({
            next: (response) => {
              this.updateUserRequest = response;

              console.log(this.updateUserRequest);
              this.updateForm = new FormGroup({

                name: new FormControl(this.updateUserRequest.name,[ Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]+")]),
                password: new FormControl(this.updateUserRequest.password,[ Validators.required, Validators.minLength(6)]),
                cpassword: new FormControl(this.updateUserRequest.password,[ Validators.required]),
                address: new FormControl(this.updateUserRequest.address,[ Validators.required, Validators.minLength(3)]),
                city: new FormControl(this.updateUserRequest.city,[ Validators.required, Validators.minLength(3)]),
                role: new FormControl(this.updateUserRequest.role,[ Validators.required]),
              });
            }
          });
        }
      }
    });
  }

  updateSubmit(){
    if(this.Password.value == this.Cpassword.value){
      console.log(this.updateForm.valid);
      console.log(this.updateForm.value);
      this.confirmPass='none';
      this.updateUserRequest.name = this.updateForm.value.name as string;
      this.updateUserRequest.password = this.updateForm.value.password as string;
      this.updateUserRequest.city = this.updateForm.value.city as string;
      this.updateUserRequest.address = this.updateForm.value.address as string;
      this.updateUserRequest.role = this.updateForm.value.role as string;
      this.updateUser();
    }
    else{
      this.confirmPass='inline';
    }
  }

  get Name(): FormControl{
    return this.updateForm.get("name") as FormControl;
  }
  get Password(): FormControl{
    return this.updateForm.get("password") as FormControl;
  }
  get Cpassword(): FormControl{
    return this.updateForm.get("cpassword") as FormControl;
  }
  get Address(): FormControl{
    return this.updateForm.get("address") as FormControl;
  }
  get City(): FormControl{
    return this.updateForm.get("city") as FormControl;
  }
  get Role(): FormControl{
    return this.updateForm.get("role") as FormControl;
  }

  updateUser(){
    this.userService.updateUser(this.updateUserRequest.id, this.updateUserRequest)
    .subscribe({
      next: (user) => {
        this.router.navigate(['/users']);
        setTimeout(function() {alert(user.name + ' updated successfully!');},600);
      }
    });
  }
  cancelUpdate(){
    this.router.navigate(['/users']);
    setTimeout(function() {alert('Update Cancelled!');},600);
  }

}
