import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'tdl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailValidators = [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\\.[a-z]{2,5}$"),
  ];

  passwordValidators = [
    Validators.required,
    Validators.minLength(3),
  ];

  loginForm = new FormGroup({
    email: new FormControl<string>("", {nonNullable: true, validators: this.emailValidators}),
    password: new FormControl<string>("", {nonNullable: true, validators: this.passwordValidators}),
    rememberMe: new FormControl<boolean>(false, {nonNullable: true}),
  });

  constructor(private authService: AuthService) {
  };

  get email() {
    return this.loginForm.get("email");
  };

  get password() {
    return this.loginForm.get("password");
  };

  onSubmit() {
    this.authService.login(this.loginForm.value);
  };

}
