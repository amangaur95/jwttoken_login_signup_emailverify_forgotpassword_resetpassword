import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:number;
  email:any;
  returnUrl: string;

public error:string;
  angForm: FormGroup;

  constructor(private userservice: UserService,
    private fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private activateRoute:ActivatedRoute,
    private loginservice:LoginService,
    ) { 
    this.createForm();
  }
  
  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  public submit(){
    this.loginservice.login(this.angForm.value)
    .pipe(first())
    .subscribe((result_loginstatus)=>{
      if(result_loginstatus==true){
        this.router.navigateByUrl(this.returnUrl);
      }
    },
    (err)=>{
      console.log(err);
    })
  }

showSuccess() {
  this.toastr.success('You Successfully LoggedIn', 'Toastr fun!');
}

  ngOnInit() {
    this.userservice.logout();
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
   
  }

}