import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private route: Router) {}

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

    // if (this.cardForm.invalid) {
    //   return;
    // }

    // console.log(this.cardForm.value);
  }
}
