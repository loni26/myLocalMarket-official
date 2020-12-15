import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private _fb: FormBuilder, private _us: UserService) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      email: ['', Validators.required],
      pw: ['', [Validators.required, Validators.minLength(8)]],
      pw2: ['', Validators.required]
    })
  }

  async registerNewUser(){
    const email: string = this.registerForm.value.email;
    const pw: any = this.registerForm.value.pw;
    const pw2: any = this.registerForm.value.pw2;

    if (pw === pw2) {
      await this._us.signup(email, pw)
      
  }else{
    alert('Les mots de passe ne sont pas identiques!');
  }
  }

}
