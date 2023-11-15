import { Component } from '@angular/core';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'payhub';
  private path = 'Users';
  users$: Observable<any[]> | undefined;
  usersCollection: CollectionReference | any;
  imageUrl: string = '';

  constructor(private readonly storage: Storage, private db: AngularFirestore) {
    this.getImages();
  }

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

  public postData(): void {
    const data = {};
    // sign up
    this.db.collection(this.path).add({ ...data });
  }

  private getImages(): void {
    this.db
      .collection(this.path)
      .snapshotChanges()
      .subscribe((res: any) => {
        console.log('User', res);
      });
  }
}
