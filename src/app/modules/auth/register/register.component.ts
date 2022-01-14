import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(4)]],
    });
  }

  register() {
    if( this.form.invalid ) {
      return;
    }

    const { ...user }: User = this.form.value;
    this.authService.register(user)
      .subscribe(({user, message}) => {
        alert(message);
        this.router.navigateByUrl('/auth/login');
      });

  }

}
