import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm: FormGroup;

  constructor(private userservice: UserService,
  private fb: FormBuilder,
  private router:Router,
  private toasterService:ToasterService,
  private signupservice:SignupService) { 
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  addUser(){
    this.signupservice.addUser(this.angForm.value)
    .subscribe((result)=>{
      console.log(result);
      if(result.code==200){
        this.router.navigateByUrl('/login');
        this.toasterService.successToaster(result.msg.str1, result.msg.str2)
      }
      else{
        this.toasterService.errorToaster(result.msg.msg1,result.msg.msg2)
      }
    })
  }

  ngOnInit() {
  }

}
