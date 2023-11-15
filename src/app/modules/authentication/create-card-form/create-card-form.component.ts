import { AuthService } from './../../../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/user/users.service';

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss'],
})
export class CreateCardFormComponent {
  cardForm!: FormGroup;
  submitted: boolean = false;
  isFetching: boolean = false;
  image: any;
  cardName: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  buildCardForm(): void {
    this.cardForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
      date: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      cardType: ['', [Validators.required]],
      uploadCard: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.buildCardForm();
  }

  get formControl(): any {
    return this.cardForm.controls;
  }

  Cards: any = ['Voters ID', 'Ghana card'];

  changeCard(e: any) {
    this.cardName?.setValue(e.target.value, {});
  }

  onSubmit() {
    this.submitted = true;
    this.isFetching = true;
    const { firstName, lastName, email, password } = this.cardForm.value;

    // if (this.cardForm.invalid) {
    //   return;
    // }

    // Send firstName lastName,email,password to firebase
    this.usersService.create({ firstName, lastName, email, password });

    // signing up with email and password
    this.authService.signup(email, password).subscribe({
      next: (res: any) => {
        this.route.navigate(['/login']);
      },
    });

    console.log(this.cardForm.value);
  }
}
