import { AuthService } from './../../../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/user/users.service';
import { CollectionReference } from '@angular/fire/firestore';
import {
  ref,
  uploadBytesResumable,
  Storage,
  getDownloadURL,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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
    private db: AngularFirestore
  ) {
    this.getImages();
  }

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

  // uploading fire to firebase
  public uploadFile(input: HTMLInputElement) {
    if (!input.files) return;

    const files: FileList = input.files;
    console.error(files);

    if (files.length) {
      const storageRef = ref(this.storage, files[0].name);
      uploadBytesResumable(storageRef, files[0]).then(async () => {
        this.imageUrl = await getDownloadURL(storageRef);
      });
    }
  }

  private getImages(): void {
    this.db
      .collection(this.path)
      .snapshotChanges()
      .subscribe((res: any) => {
        console.log('User', res);
      });
  }

  onSubmit() {
    this.submitted = true;
    this.isFetching = true;

    // if (this.cardForm.invalid) {
    //   return;
    // }
    const { firstName, lastName, email, password } = this.cardForm.value;

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
