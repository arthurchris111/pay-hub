import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/user/users.service';
import { CollectionReference } from '@angular/fire/firestore';
import { ref, uploadBytesResumable, Storage, getDownloadURL } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ProfileUser } from 'src/app/modal/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss'],
})
export class CreateCardFormComponent {
  cardForm!: FormGroup;
  submitted: boolean = false;
  isFetching: boolean = false;
  show: boolean = false;
  image: any;
  cardName: any;
  private path = 'Users';
  users$: Observable<any[]> | undefined;
  usersCollection: CollectionReference | any;
  imageUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private storage: Storage,
    private db: AngularFirestore,
    private toastr: ToastrService
  ) {
    // this.getImages();
  }

  buildCardForm(): void {
    this.cardForm = this.formBuilder.group({
      firstName: ['Matthew', [Validators.required]],
      lastName: ['Booth', [Validators.required]],
      customerEmail: ['gidi@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      cardBrand: ['visa', [Validators.required]],
      cardType: ['giftcard', [Validators.required]],
      amount: ['', [Validators.required]],
      reference: ['jadadkaaiudkkjahyyy111', [Validators.required]],
      password: ['gidi@gmail.com', [Validators.required, Validators.minLength(6)]],
      // date: ['', [Validators.required]],
      // idNumber: ['', [Validators.required]],
      // cardType: ['', [Validators.required]],
      // uploadCard: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.buildCardForm();
  }

  passwordToggle() {
    this.show = !this.show;
  }

  toggleLoading() {}

  get formControl(): any {
    return this.cardForm.controls;
  }

  // Cards: any = ['Voters ID', 'Ghana card'];

  // changeCard(e: any) {
  //   this.cardName?.setValue(e.target.value, {});
  // }

  // uploading fire to firebase
  // public uploadFile(input: HTMLInputElement) {
  //   if (!input.files) return;

  //   const files: FileList = input.files;
  //   console.error(files);

  //   if (files.length) {
  //     const storageRef = ref(this.storage, files[0].name);
  //     uploadBytesResumable(storageRef, files[0]).then(async () => {
  //       this.imageUrl = await getDownloadURL(storageRef);
  //     });
  //   }
  // }

  // private getImages(): void {
  //   this.db
  //     .collection(this.path)
  //     .snapshotChanges()
  //     .subscribe((res: any) => {
  //       console.log('User', res);
  //     });
  // }

  onSubmit() {
    this.submitted = true;
    this.isFetching = true;

    if (this.cardForm.invalid) {
      return;
    }

    //  Send data to bitnob to create card
    this.usersService.createCard(this.cardForm.value).subscribe(() => {
      console.log('data sent successfully'),
        (error: Error) => {
          console.error('Error sending data:', error);
        };
    });

    const { firstName, lastName, email, password } = this.cardForm.value;

    // Send firstName lastName,email and password to firebase
    // this.usersService.create({ firstName, lastName, email, password });

    // signing up with email and password
    this.authService.signup(email, password).subscribe({
      next: (res: any) => {
        this.route.navigate(['/auth/login']);
      },
      error: (error: any) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.toastr.error('Email already exist');
        }
      },
    });

    console.log(this.cardForm.value);
  }
}
