import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(4)]],
    });
  }

  login() {
    if( this.form.invalid ) {
      return;
    }

    const { email, password } = this.form.value;
    this.authService.login(email, password)
      .subscribe(({token}) => {
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/invoice');
      }, error => {
        alert(error.message);
      });
  }

}
