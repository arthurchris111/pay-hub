import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService
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

  passwordToggle() {
    this.show = !this.show;
  }

  get formControl(): any {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.login.value;

    if (!email || !password) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 600);

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log(res);
        this.route.navigate(['/home']);
      },
      error: (error: any) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          this.toastr.error('Invalid email');
        } else if (error.code === 'auth/invalid-login-credentials') {
          this.toastr.error('Unable to login with provided credentials');
        } else {
          this.toastr.error('Enter a valid email and password');
        }
      },
    });
    console.log(this.login.value);
  }
}
