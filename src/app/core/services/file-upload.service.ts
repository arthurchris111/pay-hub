import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: Storage) {}

  public uploadFile(): void {}
}
