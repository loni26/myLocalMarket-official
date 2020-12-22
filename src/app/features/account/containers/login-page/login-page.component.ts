import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  logInForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private _us: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login():void {
    const email = this.logInForm.value.email;
    const password = this.logInForm.value.password;
    this._us.signin(email, password)
    this.logInForm.reset();
  }

  register(){
    this.router.navigate(['/register'])
  }


}
