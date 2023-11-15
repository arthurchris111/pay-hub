import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {}

  buildLoginForm(): void {
    this.login = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  get formControl(): any {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.login.value.invalid) {
      return;
    }

    const { email, password } = this.login.value;

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log(res);
        this.route.navigate(['/home']);
      },
      error: (error: any) => {
        // console.log(error);
        //  this.toastr.error(error, 'Login');
      },
    });
    console.log(this.login.value);
  }
}
